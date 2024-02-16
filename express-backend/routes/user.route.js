const { getProjects } = require('../controllers/project.controller');
const {
  getUsers,
  getAuthUser,  
  getUser,
  updateAuthUser,
  deleteAuthUser,
} = require('../controllers/user.controller.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = require('express').Router();

router.get('/authUser', authMiddleware, getAuthUser);
router.patch('/authUser/update', authMiddleware, updateAuthUser);
router.post('/authUser/delete', authMiddleware, deleteAuthUser);
router.get('/search', authMiddleware, getUsers);
router.get('/:userId/projects', authMiddleware, getProjects);
router.get('/:userId', authMiddleware, getUser);

module.exports = router;
