const mongoose = require('mongoose');
const { Schema } = mongoose;

const frameworkSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  git: {
    type: String,
  },
  avatar: {
    type: String,
    default: ""
  },
  stars: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('Framework', frameworkSchema);
