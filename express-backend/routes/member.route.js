const router = require('express').Router();
const { removeMember, addMember } = require('../controllers/member.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.put('/add', addMember);
router.delete('/remove', authMiddleware, removeMember);

module.exports = router;
