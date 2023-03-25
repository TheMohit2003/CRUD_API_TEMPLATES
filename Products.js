// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
});

// Create product model
const Product = mongoose.model('Product', productSchema);

// Set up middleware
app.use(express.json());

/**
 * @description Get all products
 * @route GET /products
 */
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @description Get a single product by ID
 * @route GET /products/:id
 * @param {string} id - Product ID
 */
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @description Create a new product
 * @route POST /products
 * @param {string} name - Product name
 * @param {number} price - Product price
 * @param {string} [description] - Product description (optional)
 */
app.post('/products', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    const newProduct = await product.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @description Update a product by ID
 * @route PUT /products/:id
 * @param {string} id - Product ID
 * @param {string} [name] - Product name (optional)
 * @param {number} [price] - Product price (optional)
 * @param {string} [description] - Product description (optional)
 */
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @description Delete a product by ID
 * @route DELETE /products/:id
 * @param {string} id - Product ID
 */
app.delete('/products/:id', async (req, res) => {
  try {const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    }
    });
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
