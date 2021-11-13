const express = require('express')
const router = express.Router()

const profilCtrl = require('../controllers/profil')

router.get('/', profilCtrl.getProfil)
router.delete('/', profilCtrl.deleteProfil)

module.exports = router