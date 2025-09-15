const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
require('dotenv').config();

async function convert() {
  await mongoose.connect(process.env.MONGO_URI);
  const docs = await Transaction.find({});
  for (const doc of docs) {
    if (typeof doc.amount === 'string') {
      const n = Number(doc.amount);
      if (!Number.isNaN(n)) {
        doc.amount = n;
        await doc.save();
        console.log(`Converted ${doc._id} to`, n);
      }
    }
  }
  await mongoose.connection.close();
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
