import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  supplierName: {
    type: String,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
});

const Product = new mongoose.model('Product', productSchema);

export default Product;
