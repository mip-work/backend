const router = require('express').Router();

const {
  reorderLists,
  createList,
  deleteList,
  updateList,
} = require('../controllers/list.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

// neon
router.post('/create', authMiddleware, createList);
router.delete('/:id/delete', authMiddleware, deleteList);
router.patch('/:id/update', authMiddleware, updateList);
router.put('/reorder', authMiddleware, reorderLists);

module.exports = router;
