const mysql = require('../configs/database')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()

exports.getProfil = (req, res, next) => {
    const userId = jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).id
    const database = mysql.getDB()
    database.query('SELECT * FROM user WHERE id=?', userId, (err, result) => {
        if (err) {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
        return res.status(200).json(result)
    })
}

exports.getPostProfil = (req, res, next) => {
    const userId = req.params.id
    const database = mysql.getDB()
    database.query('SELECT * FROM user WHERE id=?', userId, (err, result) => {
        if (err) {
            return res.status(404).json({ errors: 'Utilisateur non trouvé' })
        }
        return res.status(200).json(result)
    })
}

exports.deleteProfil = (req, res, next) => {
    const userId = jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).id
    const database = mysql.getDB()
    database.query('DELETE FROM user WHERE id=?', userId, (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        console.log(result)
        return res.status(200).json(result)
    })
}

exports.updateProfil = (req, res, next) => {
    const data = JSON.parse(req.body.profil)
    const database = mysql.getDB()
    if (req.file) {
        const profilId = req.params.id
        console.log(profilId);
        database.query(`SELECT imageUrl FROM user WHERE id=?`, profilId, function (err, result) {
            if (err) {
                return res.status(400).json(err)
            } else {
                console.log(result);
                const filename = result[0].imageUrl
                fs.unlink(`images/${filename}`, () => {
                    const newUsername = addslashes(data.username)
                    const newEmail = addslashes(data.email)
                    const newFirstname = addslashes(data.firstname)
                    const newLastname = addslashes(data.lastname)
                    const sql = "UPDATE user SET username='" + newUsername + "', email='" + newEmail + "', firstname='" + newFirstname + "', lastname='" + newLastname + "', imageUrl='" + req.file.filename + "' WHERE id='" + req.params.id + "'"
                    database.query(sql, function (err, result) {
                        if (err) {
                            return res.status(400).json(err)
                        } else {
                            database.query("SELECT * FROM user WHERE id=?", req.params.id, function (err, result) {
                                if (err) {
                                    return res.status(400).json(err)
                                } else {
                                    return res.status(200).json(result)
                                }
                            })
                        }
                    })
                })
            }
        })
    } else {
        const newUsername = addslashes(data.username)
        const newEmail = addslashes(data.email)
        const newFirstname = addslashes(data.firstname)
        const newLastname = addslashes(data.lastname)
        const sql = "UPDATE user SET username='" + newUsername + "', email='" + newEmail + "', firstname='" + newFirstname + "', lastname='" + newLastname + "' WHERE id='" + req.params.id + "'"
        database.query(sql, function (err, result) {
            if (err) {
                console.log('erreur');
                return res.status(400).json(err)
            } else {
                database.query("SELECT * FROM user WHERE id=?", req.params.id, function (err, result) {
                    if (err) {
                        return res.status(400).json(err)
                    } else {
                        return res.status(200).json(result)
                    }
                })
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