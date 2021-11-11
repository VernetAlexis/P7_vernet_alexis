const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/profil')

router.get('/', userCtrl.getProfil)

module.exports = router