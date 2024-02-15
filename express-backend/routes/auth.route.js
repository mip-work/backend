const {
  logIn,
  logOut,
  register,
  changePwd,
} = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/logout', authMiddleware, logOut);
router.put('/changePwd', authMiddleware, changePwd);

module.exports = router;
