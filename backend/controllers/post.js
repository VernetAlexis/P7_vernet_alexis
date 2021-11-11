const mysql = require('../configs/database')
const jwt = require('jsonwebtoken')

exports.getAllPosts = (req, res, next) => {
  const database = mysql.getDB()
  database.query(`SELECT * FROM post`, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      console.log(result)
      return res.status(200).json(result)
    }
  })
}

exports.getUserPosts = (req, res, next) => {
  const userId = jwt.verify(req.cookies.session, 'SECRET_TOKEN').id
  console.log('userID' + userId)
  const database = mysql.getDB()
  database.query(`SELECT * FROM post WHERE user_id=?`, userId, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      console.log(result)
      return res.status(200).json(result)
    }
  })
}

exports.getOnePost = (req, res, next) => {
  const postId = req.params.id
  console.log(postId)
  const database = mysql.getDB()
  database.query(`SELECT * FROM post WHERE id=?`, postId, function (err, result) {
    if (err) {
      return res.status(404).json({ errors: 'Aucune données trouvées.' })
    } else {
      console.log(result)
      return res.status(200).json(result)
    }
  })
}