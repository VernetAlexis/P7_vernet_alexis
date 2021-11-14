const mysql = require('../configs/database')

exports.getPostComments = (req, res, next) => {
    const postId = req.params.id
    const database = mysql.getDB()
    database.query(`SELECT * FROM comments WHERE post_id=?`, postId,  function (err, result) {
        if (err) {
        return res.status(404).json({ errors: 'Aucune données trouvées.' })
        } else {
        return res.status(200).json(result)
        }
    })
}

exports.createComment = (req, res, next) => {
    const database = mysql.getDB()
    console.log('body');
    console.log(req.body.content);
    console.log(req.params);
    const newComment = {
        content: req.body.content,
        post_id: req.params.id
    }
    database.query(`INSERT INTO comments SET?`, newComment, function (err, result) {
        if (err) {
            console.log('erreur');
            return res.status(400).json(err)
        } else {
            console.log('bravo');
            return res.status(201).json(result)
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
            return database.query("SELECT * FROM comments WHERE id=?", req.params.id)
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