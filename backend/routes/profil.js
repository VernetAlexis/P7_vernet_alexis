const express = require('express')
const router = express.Router()

const multer = require('../configs/multer')
const profilCtrl = require('../controllers/profil')
const auth = require('../middleware/auth')

router.get('/', auth, profilCtrl.getProfil)
router.delete('/', auth, profilCtrl.deleteProfil)
router.put('/:id', auth, multer, profilCtrl.updateProfil)

module.exports = router