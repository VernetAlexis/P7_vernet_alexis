const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);

module.exports = router;