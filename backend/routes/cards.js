const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patterUrl } = require('../utils/constants');
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardIdValidationConfig = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(patterUrl),
  }),
}), createCard);
router.delete('/:cardId', celebrate(cardIdValidationConfig), removeCard);
router.put('/:cardId/likes', celebrate(cardIdValidationConfig), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdValidationConfig), dislikeCard);

module.exports = router;
