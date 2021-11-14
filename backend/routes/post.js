const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../configs/multer')
const auth = require('../middleware/auth')

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/user/post', auth, postCtrl.getUserPosts);
router.post('/', auth, multer, postCtrl.createPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.put('/:id', auth, multer, postCtrl.updatePost)

module.exports = router;