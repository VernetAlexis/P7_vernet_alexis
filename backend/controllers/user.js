const jwt = require('jsonwebtoken')
const mysql = require('../configs/database')


exports.login = (req, res, next) => {
    const database = mysql.getDB()
    const email = req.body.email
    console.log(req.body)
    database.query(`SELECT id, email, password FROM user WHERE email=?`, email, function (err, result) {
        console.log(result)
        if (err) {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
        if (result[0]) {
            if (req.body.password !== result[0].password) {
                return res.status(401).json({ errors: 'Mot de passe incorrect' })
            }
            const token = jwt.sign( {id : result.id} , 'SECRET_TOKEN', {
                expiresIn: '24h',
            });
            res.cookie("session", token);
            res.status(200).json({ message : 'Connecté' })
        } else {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
    })
}

exports.signup = (req, res, next) => {
    const database = mysql.getDB()
    const newUser = {email: req.body.email, password: req.body.password}
    database.query(`INSERT INTO user SET?`, newUser, (err, result) => {
        if (err) throw err
        console.log(result)
        res.status(201).json({ message: 'Utilisateur créé' })
    })
}

exports.currentUser = (req, res, next) => {
    if (req.cookies.session) {
        console.log('User connecté')
        res.status(200).json({ message: 'User connecté' })
    } else {
        console.log('Pas connecté')
        res.status(401).json({ error: 'Unauthorized' })
    }
}