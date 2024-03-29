const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user')

router.post('/login', userCtrl.login)
router.post('/signup', userCtrl.signup)
router.get('/logout', userCtrl.logout)
router.get('/me', userCtrl.currentUser)
router.get('/', auth, userCtrl.getAllUsers)

module.exports = router