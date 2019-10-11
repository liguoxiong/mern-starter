import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Joi from 'joi';
dotEnv.config();
//simple schema
const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cusInfo: {
    cusPhoneNo: {
      type: String,
    },
    cusName: {
      type: String,
    },
    cusAddress: {
      type: String,
    },
    cusAddressCode: {
      type: String,
    },
  },
  deliveryTime: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  salePrice: {
    type: Number,
  },
  statusCode: {
    type: Number,
    default: 0,
  },
  created_at: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
