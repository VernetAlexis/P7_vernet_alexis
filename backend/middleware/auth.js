const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const userId = jwt.verify(req.cookies.session, process.env.SECRET_TOKEN).id
        console.log(userId)
        console.log(req.body)
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valable'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' })
    }
}