import mongoose from "mongoose";
import dotEnv from "dotenv";
import Joi from "joi";
dotEnv.config();
//simple schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  description: {
    type: String
  },
  documentation: {
    type: String
  },
  origin: {
    type: String
  },
  model_number: {
    type: String
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
  image: {
    type: Array,
    required: true,
    default: []
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", ProductSchema);

//function to validate Product
export const validateProduct = product => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .allow("")
      .optional(),
    documentation: Joi.string()
      .allow("")
      .optional(),
    origin: Joi.string()
      .allow("")
      .optional(),
    isShow: Joi.boolean(),
    model_number: Joi.string()
      .allow("")
      .optional(),
    dilivery_time: Joi.string()
      .allow("")
      .optional(),
    warranty_time: Joi.string()
      .allow("")
      .optional(),
    image: Joi.array().required(),
    category: Joi.string().required()
  };

  return Joi.validate(product, schema);
};

export default Product;
