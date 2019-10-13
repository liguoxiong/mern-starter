import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Joi from 'joi';

dotEnv.config();
// simple schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  overview: {
    type: String
  },
  original_price: {
    type: Number,
    min: 0
  },
  sale_price: {
    type: Number,
    min: 0
  },
  promotion_campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PromotionCampaign'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },
  rating: {
    type: Number,
    default: 0
  },
  origin: {
    type: String
  },
  model: {
    type: String,
    unique: true,
    required: true
  },
  dilivery_time: {
    type: String
  },
  warranty_time: {
    type: String
  },
  isShow: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 10
  },
  haveSold: {
    type: Number,
    default: 0
  },
  image: {
    type: Array,
    required: true,
    default: []
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

const Product = mongoose.model('Product', ProductSchema);

// function to validate Product
export const validateProduct = product => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    overview: Joi.string(),
    original_price: Joi.number(),
    promotion_campaign: Joi.string(),
    branch: Joi.string(),
    origin: Joi.string(),
    rating: Joi.number(),
    isShow: Joi.boolean(),
    model: Joi.string().required(),
    dilivery_time: Joi.string(),
    warranty_time: Joi.string(),
    stock: Joi.number(),
    image: Joi.array(),
    category: Joi.string()
  };

  return Joi.validate(product, schema);
};

export default Product;
