const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import the models from index.js and review.js
const Product = require("./index");
const Reviews = require("./review");
const Payment = require("./payment");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define your API routes for products and reviews here

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

// Define your API routes for reviews here

// GET all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Reviews.find({}, { __v: 0 }); // Exclude only __v field
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST a new review
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = new Reviews(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// PATCH (update) a review by ID
app.patch("/api/reviews/:id", async (req, res) => {
  try {
    const updatedReview = await Reviews.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    ).select({ __v: 0 }); // Exclude only __v field

    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE a review by ID
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Reviews.findOneAndRemove({
      id: req.params.id,
    });
    if (deletedReview) {
      res.json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET all payments
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find({}, { __v: 0 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST a new payment
app.post("/api/payments", async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// PATCH (update) a payment by ID
app.patch("/api/payments/:id", async (req, res) => {
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).select({ __v: 0 });

    if (updatedPayment) {
      res.json(updatedPayment);
    } else {
      res.status(404).json({ error: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE a payment by ID
app.delete("/api/payments/:id", async (req, res) => {
  try {
    const deletedPayment = await Payment.findOneAndRemove({
      _id: req.params.id,
    });

    if (deletedPayment) {
      res.json({ message: "Payment deleted successfully" });
    } else {
      res.status(404).json({ error: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// ...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
