const mysql = require('../configs/database')
const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.getAllPosts = (req, res, next) => {
  const database = mysql.getDB()
  database.query(`SELECT * FROM post`, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      return res.status(200).json(result)
    }
  })
}

exports.getUserPosts = (req, res, next) => {
  const userId = jwt.verify(req.cookies.session, 'SECRET_TOKEN').id
  const database = mysql.getDB()
  database.query(`SELECT * FROM post WHERE user_id=?`, userId, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      return res.status(200).json(result)
    }
  })
}

exports.getOnePost = (req, res, next) => {
  const postId = req.params.id
  const database = mysql.getDB()
  database.query(`SELECT * FROM post WHERE id=?`, postId, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      return res.status(200).json(result)
    }
  })
}

exports.createPost = (req, res, next) => {
  const data = JSON.parse(req.body.post)
  const userId = jwt.verify(req.cookies.session, 'SECRET_TOKEN').id
  const newPost = {
    title: data.title,
    description: data.description,
    imageUrl: req.file.filename,
    user_id: userId
  }
  const database = mysql.getDB()
  database.query(`INSERT INTO post SET?`, newPost, function (err, result) {
    if (err) {
      return res.status(400).json({ errors: 'Upload échoué' })
    } else {
      return res.status(200).json(result)
    }
  })
}

exports.deletePost = (req, res, next) => {
  const postId = req.params.id
  const database = mysql.getDB()
  database.query(`SELECT imageUrl FROM post WHERE id=?`, postId, function (err, result) {
    if (err) {
      return res.status(400).json(err)
    } else {
      const filename = result[0].imageUrl
      fs.unlink(`images/${filename}`, () => {
        database.query(`DELETE FROM post WHERE id=?`, postId, function (err, result) {
          if (err) {
            return res.status(404).json({ errors: 'Aucune données trouvées.' })
          } else {
            return res.status(200).json(result)
          }
        }) 
      })
    }
  })
}

exports.updatePost = (req, res, next) => {
  const data = JSON.parse(req.body.post)
  const database = mysql.getDB()
  console.log(data);
  console.log(req.file);
  console.log(req.params.id);
  if (req.file) {
    const postId = req.params.id
    database.query(`SELECT imageUrl FROM post WHERE id=?`, postId, function (err, result) {
      if (err) {
        return res.status(400).json(err)
      } else {
        const filename = result[0].imageUrl
        fs.unlink(`images/${filename}`, () => {
          const newTitle = addslashes(data.title)
          const newDescription = addslashes(data.description)
          const updatedPost = "UPDATE post SET title='" + newTitle + "', description='" + newDescription + "', imageUrl='" + req.file.filename +  "' WHERE id='" + req.params.id + "'" 
          database.query(updatedPost, function (err, result) {
            if (err) {
              return res.status(400).json(err)
            } else {
              return res.status(200).json(result)
            }
          }) 
        })
      }
    })
  } else {
    const newTitle = addslashes(data.title)
    const newDescription = addslashes(data.description)
    const updatedPost = "UPDATE post SET title='" + newTitle + "', description='" + newDescription + "' WHERE id='" + req.params.id + "'" 
    console.log(updatedPost);
    database.query(updatedPost, function (err, result) {
      if (err) {
        return res.status(400).json(err)
      } else {  
        return res.status(200).json(result)
      }
    })
  }
}

function addslashes(ch) {
  ch = ch.replace(/\\/g,"\\\\")
  ch = ch.replace(/\'/g,"\\'")
  ch = ch.replace(/\"/g,"\\\"")
  return ch
}