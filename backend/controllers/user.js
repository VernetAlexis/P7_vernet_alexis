const User = require('../models/User')

exports.login = (req, res, next) => {
    User.findOne( req.body.email )
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur not found' })
            }
            if(req.body.password !== user.password) {
                return res.status(401).json({ error: 'Mot de passe incorrect' })
            }
            res.status(200).json({ userId: user._id })
        })
        .catch(error => res.status(500).json ({ error }))
}