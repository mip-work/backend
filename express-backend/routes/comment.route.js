const router = require('express').Router();
const { createComment, deleteComment } = require('../controllers/comment.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createComment);
router.delete('/:id/delete', authMiddleware, deleteComment);

module.exports = router;
