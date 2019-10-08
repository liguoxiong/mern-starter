import mongoose from "mongoose";
import dotEnv from "dotenv";
import Joi from "joi";
dotEnv.config();
//simple schema
const ConstructionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  description: {
    type: String,
    unique: false,
    required: false
  },
  image: {
    type: Array,
    required: true,
    default: []
  },
  created_at: { type: Date, default: Date.now }
});

const Construction = mongoose.model("Construction", ConstructionSchema);

//function to validate Construction
export const validateConstruction = construction => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .allow("")
      .optional(),
    image: Joi.array().required(),
  };

  return Joi.validate(construction, schema);
};

export default Construction;
