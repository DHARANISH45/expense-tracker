const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true }, // Income or Expense
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
