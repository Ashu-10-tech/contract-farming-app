const express = require('express');
const Tender = require('../models/Tender');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const tenders = await Tender.find();
  res.json(tenders);
});

router.post('/', auth, async (req, res) => {
  const { title, details, value, imageUrl } = req.body;
  const newTender = new Tender({ title, details, value, imageUrl, company: req.user.username });
  await newTender.save();
  res.status(201).json(newTender);
});

router.post('/:id/bid', auth, async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  tender.bids.push({ farmer: req.user.username, amount: req.body.amount });
  await tender.save();
  res.json({ message: 'Bid placed' });
});

module.exports = router;
