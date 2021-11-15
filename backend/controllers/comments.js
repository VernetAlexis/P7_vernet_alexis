const mysql = require('../configs/database')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getPostComments = (req, res, next) => {
    const postId = req.params.id
    const database = mysql.getDB()
    database.query(`SELECT * FROM comments WHERE post_id=? ORDER BY id DESC`, postId,  function (err, result) {
        if (err) {
        return res.status(404).json({ errors: 'Aucune données trouvées.' })
        } else {
        return res.status(200).json(result)
        }
    })
}

exports.createComment = (req, res, next) => {
    const database = mysql.getDB()
    const newComment = {
        content: req.body.content,
        post_id: req.params.id,
        user_id: jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).id
    }
    database.query(`INSERT INTO comments SET?`, newComment, function (err, result) {
        if (err) {
            console.log('erreur');
            return res.status(400).json(err)
        } else {
            database.query("SELECT * FROM comments WHERE id=(SELECT MAX(id) FROM comments)", function (err, result) {
                if (err) {
                    return res.status(400).json(err)
                } else {
                    return res.status(200).json(result)
                }
            })
        }
    })
}

exports.updateComment = (req, res, next) => {
    const database = mysql.getDB()
    const newContent = addslashes(req.body.content)
    const sql = "UPDATE comments SET content='" + newContent + "' WHERE id='" + req.params.id + "'"
    database.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json(err)
        } else {
            console.log('bravo');
            database.query("SELECT * FROM comments WHERE id=?", req.params.id, function (err, result) {
                if (err) {
                    return res.status(400).json(err)
                } else {
                    return res.status(200).json(result)
                }
            })
        }
    }) 
}

exports.deleteComment = (req, res, next) => {
    const database = mysql.getDB()
    database.query(`DELETE FROM comments WHERE id=?`, req.params.id, function (err, result) {
        if (err) {
            return res.status(400).json(err)
        } else {
            return res.status(200).json(result)
        }
    })
}

function addslashes(ch) {
    ch = ch.replace(/\\/g,"\\\\")
    ch = ch.replace(/\'/g,"\\'")
    ch = ch.replace(/\"/g,"\\\"")
    return ch
}