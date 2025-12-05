// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/cart');

const placeOrder = async (req, res) => {
  const { user_id, total } = req.body;
  const cart = await Cart.findOne({ user_id });
  const newOrder = new Order({ user_id, total, products: cart.products });
  await newOrder.save();
  await Cart.findOneAndDelete({ user_id });
  res.send('Order placed');
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.params.userId });
  res.json(orders);
};

module.exports = { placeOrder, getOrders };
