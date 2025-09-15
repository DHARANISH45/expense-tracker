const mongoose = require('mongoose');
require('dotenv').config();
const Transaction = require('./models/Transaction');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

const sampleTransactions = [
  { amount: 50, type: 'Income', category: 'Salary', description: 'Monthly salary', date: new Date() },
  { amount: 10, type: 'Expense', category: 'Food', description: 'Lunch', date: new Date() },
  { amount: 25.5, type: 'Expense', category: 'Transport', description: 'Taxi', date: new Date() },
  { amount: 100, type: 'Income', category: 'Freelance', description: 'Project payment', date: new Date() }
];

async function seed() {
  try {
    console.log('Connecting to', MONGO_URI);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Optional: clear existing transactions
    await Transaction.deleteMany({});
    console.log('Cleared existing transactions');

    const inserted = await Transaction.insertMany(sampleTransactions);
    console.log(`Inserted ${inserted.length} transactions`);

    await mongoose.disconnect();
    console.log('Disconnected and finished seeding');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
