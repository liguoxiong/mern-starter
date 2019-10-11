import mongoose from 'mongoose';
import { Order, Product } from './../models';

const createOrder = async (req, res) => {
  const {
    products,
    userId,
    cusInfo,
    deliveryTime,
    totalPrice,
    discountPrice,
    salePrice,
    ...rst
  } = req.body;
  try {
    products.map(item => (item.product = mongoose.Types.ObjectId(item.product)));
    const order = new Order({
      products,
      userId: mongoose.Types.ObjectId(userId),
      cusInfo,
      deliveryTime,
      totalPrice,
      discountPrice,
      salePrice,
    });
    let productsOutOfStock = [];
    await Promise.all(
      products.map(async item => {
        const product = await Product.findById(item.product);
        if (product.stock < item.quantity) {
          productsOutOfStock.push(product);
        }
      }),
    );
    if (productsOutOfStock.length) {
      return res.status(200).send({
        success: false,
        message: 'Product out of stock',
        outOfStock: productsOutOfStock,
      });
    }
    await Promise.all([
      products.map(item => {
        Product.findById(item.product, function(err, product) {
          product.haveSold = product.haveSold + item.quantity;
          product.stock = product.stock - item.quantity;
          product.save();
        });
      }),
      order.save(),
    ]);
    let resOrder = await Order.findById(order._id);
    return res.status(200).send({
      success: true,
      order: resOrder,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id).populate('products.product');
    if (!order)
      return res.status(400).send({
        success: false,
        message: 'Order is not existed.',
      });
    res.status(200).send({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    let [total, orders] = await Promise.all([
      Order.countDocuments(),
      Order.find()
        .sort('-created_at')
        .populate('products.product'),
    ]);
    res.status(200).send({
      success: true,
      orders,
      total,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    //{orderIdx: [ObjId], status: number}
    const { orderIdx, statusCode } = req.body;
    let orders = [];
    await Promise.all(
      orderIdx.map(async item => {
        const order = await Order.findById(item);
        order.statusCode = statusCode;
        orders.push(order);
        await order.save();
      }),
    );
    return res.status(200).send({
      success: true,
      orders,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export default {
  createOrder,
  getOrderById,
  getAllOrder,
  changeOrderStatus,
};
