const mongoose = require('mongoose');
const { Schema } = mongoose;

const frameworkSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  git: {
    type: String,
  },
  stars: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('Framework', frameworkSchema);
