const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({ transactions: transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new transaction
router.post('/', async (req, res) => {
    let { amount, type, category, description, date } = req.body;
    // coerce amount to a Number if possible
    if (typeof amount === 'string') {
        const n = Number(amount);
        amount = Number.isNaN(n) ? amount : n;
    }
    const isEmpty = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
    if (isEmpty(amount) || isEmpty(type) || isEmpty(category) || isEmpty(date)) {
        return res.status(400).json({ message: "All fields are required." });
    }
    // coerce date strings to Date
    if (typeof date === 'string') {
        const d = new Date(date);
        if (!isNaN(d.getTime())) date = d;
    }
    const transaction = new Transaction({ amount, type, category, description, date });
    try {
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update transaction
router.put('/:id', async (req, res) => {
    let { amount, type, category, description, date } = req.body;
    // coerce amount to a Number if possible
    if (typeof amount === 'string') {
        const n = Number(amount);
        amount = Number.isNaN(n) ? amount : n;
    }
    const isEmpty = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
    if (isEmpty(amount) || isEmpty(type) || isEmpty(category) || isEmpty(date)) {
        return res.status(400).json({ message: "All fields are required." });
    }
    // coerce date strings to Date
    if (typeof date === 'string') {
        const d = new Date(date);
        if (!isNaN(d.getTime())) date = d;
    }
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { amount, type, category, description, date },
            { new: true, runValidators: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        res.json(updatedTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const removedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!removedTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        res.json(removedTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
