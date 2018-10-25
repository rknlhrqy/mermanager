const mongoose = require('mongoose');

const { Schema } = mongoose;

const mermanSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlenght:  1,
    unique: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
  },
}); 

const Merman = mongoose.model('Merman', mermanSchema);

module.exports = {
  Merman,
};