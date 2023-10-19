const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");

app.use(bodyParser.json());

// Define the schema
const paymentsSchema = new mongoose.Schema({
  cardHolder: { type: String, required: true },
  cardType: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardExp: { type: String, required: true },
  cardCvv: { type: String, required: true },
});

// Define the model
const Payment = mongoose.model("Payment", paymentsSchema);

module.exports = Payment;

// API routes

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
