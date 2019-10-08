import mongoose from "mongoose";
import dotEnv from "dotenv";
import Joi from "joi";
dotEnv.config();
//simple schema
const InfoSchema = new mongoose.Schema({
  company: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  facebook: {
    type: String
  },
  messenger: {
    type: String
  },
  zalo: {
    type: String
  },
  skype: {
    type: String
  },
  viber: {
    type: String
  },
  logo: {
    type: String
  },
  created_at: { type: Date, default: Date.now }
});

const Info = mongoose.model("Info", InfoSchema);

//function to validate Product
export const validateInfo = info => {
  const schema = {
    company: Joi.string().required(),
    address: Joi.string()
      .allow("")
      .optional(),
    phone: Joi.string()
      .allow("")
      .optional(),
    email: Joi.string()
      .allow("")
      .optional(),
    facebook: Joi.string()
      .allow("")
      .optional(),
    zalo: Joi.string()
      .allow("")
      .optional(),
    messenger: Joi.string()
      .allow("")
      .optional(),
    viber: Joi.string()
      .allow("")
      .optional(),
    skype: Joi.string()
      .allow("")
      .optional(),
    logo: Joi.string()
      .allow("")
      .optional()
  };

  return Joi.validate(info, schema);
};

export default Info;
