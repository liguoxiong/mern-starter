import mongoose from "mongoose";
import dotEnv from "dotenv";
import Joi from "joi";
dotEnv.config();
//simple schema
const ServiceSchema = new mongoose.Schema({
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
    type: String,
    unique: false,
    required: true
  },
  created_at: { type: Date, default: Date.now }
});

const Service = mongoose.model("Service", ServiceSchema);

//function to validate Service
export const validateService = service => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .allow("")
      .optional(),
    image: Joi.string().required()
  };

  return Joi.validate(service, schema);
};

export default Service;
