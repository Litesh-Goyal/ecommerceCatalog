const mongoose = require("mongoose");

// Variant Schema
const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  color: String,
  price: Number,
  stock: Number
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 }
});

// Indexing
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });

// Calculate Average Rating
productSchema.methods.calculateAvgRating = function () {
  if (this.reviews.length === 0) {
    this.avgRating = 0;
  } else {
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.avgRating = sum / this.reviews.length;
  }
};

// Stock Update Method
productSchema.methods.updateStock = function (sku, quantity) {
  const variant = this.variants.find(v => v.sku === sku);
  if (variant) {
    variant.stock += quantity;
  }
};

module.exports = mongoose.model("Product", productSchema);