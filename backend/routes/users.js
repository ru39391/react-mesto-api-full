const router = require('express').Router();
const { getUsers, getUser, updateUser, updateUserPic } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserPic);

module.exports = router;
