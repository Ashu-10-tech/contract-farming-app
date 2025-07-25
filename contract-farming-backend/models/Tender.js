const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: String,
  details: String,
  value: Number,
  imageUrl: String,
  company: String,
  bids: [
    {
      farmer: String,
      amount: Number
    }
  ]
});

module.exports = mongoose.model('Tender', tenderSchema);
