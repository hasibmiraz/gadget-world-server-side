// External libraries
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import Product from './schemas/productSchema.js';

// Variable calls
const app = express();
const port = process.env.PORT || 5000;

// Use middlewares
app.use(express.json());
app.use(cors());

// Connect db
const databaseUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zxs4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(databaseUri)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

// get route
app.get('/', async (req, res) => {
  try {
    const data = await Product.find({}).limit(5);
    res.status(200).json({
      result: data,
      message: 'Success',
    });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server side error',
    });
  }
});

// Get products for home page
app.get('/homePageProducts', (req, res) => {
  Product.find()
    .limit(6)
    .exec((err, data) => {
      err
        ? res.status(500).json({
            error: 'There was a server side error',
          })
        : res.status(200).json({
            result: data,
            message: 'Success',
          });
    });
});

// Get Single product
app.get('/:id', async (req, res) => {
  try {
    const data = await Product.find({ _id: req.params.id });
    res.status(200).json({
      product: data[0],
      message: 'Success',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error',
    });
  }
});

// Update delivered quantity
app.put('/update-delivered/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          quantity: req.body.quantity,
          sold: req.body.sold,
        },
      },
      { new: true }
    );

    res.status(200).json({
      result,
      message: 'Todo was updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was a server side error',
    });
  }
});

// Create a product
app.post('/', async (req, res) => {
  const newProduct = new Product({ ...req.body });
  try {
    const product = await newProduct.save();
    res.status(200).json({
      result: product,
      message: 'Todo was inserted successfully',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error',
    });
  }
});

app.listen(port, console.log(`Listening to port ${port}`));
