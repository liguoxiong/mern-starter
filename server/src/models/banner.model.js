import mongoose from "mongoose";
import dotEnv from "dotenv";
import Joi from "joi";
dotEnv.config();
//simple schema
const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: false
  },
  description: {
    type: String,
    unique: false,
    required: false
  },
  created_at: { type: Date, default: Date.now },
  image: {
    type: String,
    unique: false,
    required: true
  }
});

const Banner = mongoose.model("Banner", BannerSchema);

//function to validate Banner
export const validateBanner = banner => {
  const schema = {
    title: Joi.string()
      .allow("")
      .optional(),
    description: Joi.string()
      .allow("")
      .optional(),
    image: Joi.string().required()
  };

  return Joi.validate(banner, schema);
};

export default Banner;
