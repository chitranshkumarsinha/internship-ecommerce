const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, vendorOnly } = require('../middleware/auth');
router.get('/', async (req, res) => { const products = await Product.find().populate('vendorId', 'name'); res.json(products); });
router.post('/', protect, vendorOnly, async (req, res) => { const { name, description, price } = req.body; const product = await Product.create({ name, description, price, vendorId: req.user._id }); res.status(201).json(product); });
router.get('/my-products', protect, vendorOnly, async (req, res) => { const products = await Product.find({ vendorId: req.user._id }); res.json(products); });
module.exports = router;