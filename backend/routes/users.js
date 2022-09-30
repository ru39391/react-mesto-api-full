const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patterUrl } = require('../utils/constants');
const {
  getUsers, getUser, updateUser, updateUserPic,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(/[a-m0-9]{2,24}/).min(2).max(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(8).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(patterUrl),
  }),
}), updateUserPic);

module.exports = router;
