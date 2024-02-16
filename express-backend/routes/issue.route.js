const router = require('express').Router();

const { getComments } = require('../controllers/comment.controller');
const {
  reorderIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issue.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/:issueId/comments', authMiddleware, getComments);
router.put('/reorder', authMiddleware, reorderIssues);
router.post('/create', authMiddleware, createIssue);
router.patch('/:id/update', authMiddleware, updateIssue);
router.delete('/:id/delete', authMiddleware, deleteIssue);

module.exports = router;
