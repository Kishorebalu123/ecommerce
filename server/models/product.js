const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 
  title: String,
  brand: String,
  price: Number,
  imageUrl: String,
  rating: Number,
  availability: String,
  description: String,
  totalReviews:Number,
});

module.exports = mongoose.model('Product', productSchema);
