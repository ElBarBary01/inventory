const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: 
  {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  weight: {

    type: String,
    required: true
  },
  category: {

    type: String,
    required: true
  },
  measurement: {

    type: Number,
    required: true
  },
  Image: {
    type: String,
    required: true
  }

});
const products = mongoose.model('products',productSchema);
module.exports = products