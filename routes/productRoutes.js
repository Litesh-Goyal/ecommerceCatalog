const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create Product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    product.calculateAvgRating();
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update Stock
router.put("/stock/:id", async (req, res) => {
  const { sku, quantity } = req.body;

  const product = await Product.findById(req.params.id);
  product.updateStock(sku, quantity);

  await product.save();
  res.json(product);
});

module.exports = router;