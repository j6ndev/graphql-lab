const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Task', taskSchema);
