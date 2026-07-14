const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
router.post('/', protect, async (req, res) => { if (req.user.role !== 'Customer') return res.status(403).json({ message: 'Only customers can order' }); const { products, totalAmount } = req.body; const order = await Order.create({ customerId: req.user._id, products, totalAmount }); res.status(201).json(order); });
router.get('/my-orders', protect, async (req, res) => { if (req.user.role === 'Customer') { const orders = await Order.find({ customerId: req.user._id }).populate('products.productId'); return res.json(orders); } if (req.user.role === 'Vendor') { const allOrders = await Order.find().populate('products.productId'); const myOrders = allOrders.filter(order => order.products.some(p => p.productId && p.productId.vendorId.toString() === req.user._id.toString())); return res.json(myOrders); } });
module.exports = router;