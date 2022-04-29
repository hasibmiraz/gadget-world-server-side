import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  price: {
    type: Number,
    required: true,
  },
});

const Product = new mongoose.model('Product', productSchema);

export default Product;
