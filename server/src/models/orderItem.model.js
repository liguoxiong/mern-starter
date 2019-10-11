import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Joi from 'joi';
dotEnv.config();
//simple schema
const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
  forOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  created_at: { type: Date, default: Date.now },
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

//function to validate OrderItem
export const validateOrderItem = orderItem => {
  const schema = {
    product: Joi.string(),
    quantity: Joi.number(),
    forOder: Joi.string(),
  };

  return Joi.validate(orderItem, schema);
};

export default OrderItem;
