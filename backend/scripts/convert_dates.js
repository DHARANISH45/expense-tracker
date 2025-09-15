const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
require('dotenv').config();

async function convert() {
  await mongoose.connect(process.env.MONGO_URI);
  const docs = await Transaction.find({});
  for (const doc of docs) {
    if (typeof doc.date === 'string') {
      const d = new Date(doc.date);
      if (!isNaN(d.getTime())) {
        doc.date = d;
        await doc.save();
        console.log(`Converted date for ${doc._id} to`, d.toISOString());
      }
    }
  }
  await mongoose.connection.close();
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
