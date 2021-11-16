const jwt = require('jsonwebtoken')
const mysql = require('../configs/database')
const validator = require('validator')
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.login = (req, res, next) => {
    const database = mysql.getDB()
    const email = req.body.email
    database.query(`SELECT id, email, password, username FROM user WHERE email=?`, email, function (err, result) {
        if (err) {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
        if (result[0]) {
            bcrypt.compare(req.body.password, result[0].password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ errors: 'Mot de passe incorrect' })
                    }
                    const token = jwt.sign( {id: result[0].id, username: result[0].username} , process.env.SECRET_TOKEN, {
                        expiresIn: '24h',
                    });
                    res.cookie("session", token);
                    res.status(200).json({ userId: result[0].id, username: result[0].username })
                })
                .catch(error => res.status(400).json({ error }))
        } else {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
    })
}

exports.signup = (req, res, next) => {
    if (!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({ errors: 'Mot de passe trop faible. Votre mot de passe doit contenir au moins: 8 caractères, 1 majuscule, 1 minuscule, 1 chiffres et 1 symbole'})
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = {email: req.body.email, username: req.body.username, password:hash}
                const database = mysql.getDB()
                database.query(`INSERT INTO user SET?`, newUser, (err, result) => {
                    if (err) {
                        return res.status(401).json({ errors: 'Adresse mail ou nom d\'utilisateur déjà utilisé' })
                    } else {
                        database.query("SELECT * FROM user WHERE email=?", req.body.email, function (err, result) {
                            if (err) {
                                return res.status(400).json(err)
                            } else {
                                const token = jwt.sign( {id: result[0].id, username: result[0].username} , process.env.SECRET_TOKEN, {
                                    expiresIn: '24h',
                                });
                                res.cookie("session", token);
                                res.status(201).json({ userId: result[0].id, username: result[0].username })
                            }
                        })
                    }
                })
            })
            .catch(error => res.status(500).json({ error }))
    }
}

exports.currentUser = (req, res, next) => {
    if (req.cookies.session) {
        console.log('User connecté')
        const userId = jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).id;
        const username = jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).username;
        res.status(200).json({ userId: userId, username: username })
    } else {
        console.log('Pas connecté')
        res.status(401).json({ error: 'Unauthorized' })
    }
}

exports.logout = (req, res, next) => {
    res.clearCookie("session")
    res.status(200).json({ message: 'Utilisateur deconnecté' })
}

exports.getAllUsers = (req, res, next) => {
    const database = mysql.getDB()
    database.query(`SELECT * FROM user`, function (err, result) {
        if (err) {
            return res.status(404).json({ errors: 'Aucune données trouvées.' })
        } else {
            return res.status(200).json(result)
        }
    })
}