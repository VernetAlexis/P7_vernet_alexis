const mysql = require('../configs/database')
const jwt = require('jsonwebtoken')

exports.getProfil = (req, res, next) => {
    const userId = jwt.verify(req.cookies.session, 'SECRET_TOKEN').id
    const database = mysql.getDB()
    database.query('SELECT * FROM user WHERE id=?', userId, (err, result) => {
        if (err) {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
        console.log(result)
        return res.status(200).json(result)
    })
}