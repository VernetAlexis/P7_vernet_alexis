const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../configs/multer')

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.get('/user/post', postCtrl.getUserPosts);
router.post('/', multer, postCtrl.createPost)
router.delete('/:id', postCtrl.deletePost)
router.put('/:id', multer, postCtrl.updatePost)

module.exports = router;