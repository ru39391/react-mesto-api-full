const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const AccessError = require('../errors/access-err');
const { actionMessages, errMessageNotFound } = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

module.exports.removeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errMessageNotFound.card));
      }
      switch (_id === JSON.stringify(card.owner).split('"')[1]) {
        case true:
          Card.findOneAndRemove({ owner: _id, id: cardId })
            .then(() => res.send({ message: actionMessages.successCardRemoved }))
            .catch((err) => next(err));
          break;
        case false:
          return next(new AccessError(actionMessages.errorCardAccess));
          break;
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(actionMessages.errorId));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errMessageNotFound.card));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(actionMessages.errorId));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errMessageNotFound.card));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(actionMessages.errorId));
      }
      return next(err);
    });
};
