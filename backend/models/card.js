const mongoose = require('mongoose');
const { errMessageValidation, patterUrl } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, errMessageValidation.min],
    maxlength: [30, errMessageValidation.max],
    required: [true, errMessageValidation.required],
  },
  link: {
    type: String,
    required: [true, errMessageValidation.required],
    validate: {
      validator: (value) => patterUrl.test(value),
      message: errMessageValidation.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errMessageValidation.required],
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
