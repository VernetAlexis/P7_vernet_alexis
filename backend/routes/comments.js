const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth')

router.get('/:id', auth, commentsCtrl.getPostComments);
router.post('/:id', auth, commentsCtrl.createComment)
router.put('/:id', auth, commentsCtrl.updateComment)
router.delete('/:id', auth, commentsCtrl.deleteComment)

module.exports = router;