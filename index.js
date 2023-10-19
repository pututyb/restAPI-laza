const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");

app.use(bodyParser.json());

// Define the schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: {
    id: Number,
    name: String,
    image: String,
  },
  images: [String],
});

// Define the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

/// API routes

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}, { __v: 0 }); // Exclude only __v field
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST a new product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// PATCH (update) a product by ID
app.patch("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    ).select({ __v: 0 }); // Exclude only __v field

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE a product by ID
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      id: req.params.id,
    });
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
