import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Joi from 'joi';
dotEnv.config();
//simple schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', CategorySchema);

//function to validate Category
export const validateCategory = category => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .allow('')
      .optional(),
    image: Joi.string(),
  };

  return Joi.validate(category, schema);
};

export default Category;
