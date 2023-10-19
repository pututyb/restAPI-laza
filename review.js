const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");

app.use(bodyParser.json());

// Define the schema
const reviewsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  ratings: Number,
});

// Define the model
const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;

/// API routes

// GET all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Reviews.find({}, { __v: 0 }); // Exclude only __v field
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST a new reviews
app.post("/api/reviews", async (req, res) => {
  try {
    const newReviews = new Reviews(req.body);
    const savedReviews = await newReviews.save();
    res.status(201).json(savedReviews);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// PATCH (update) a reviews by ID
app.patch("/api/reviews/:id", async (req, res) => {
  try {
    const updatedReviews = await Reviews.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    ).select({ __v: 0 }); // Exclude only __v field

    if (updatedReviews) {
      res.json(updatedReviews);
    } else {
      res.status(404).json({ error: "Reviews not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE a reviews by ID
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReviews = await Reviews.findOneAndRemove({
      id: req.params.id,
    });
    if (deletedReviews) {
      res.json({ message: "Reviews deleted successfully" });
    } else {
      res.status(404).json({ error: "Reviews not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
