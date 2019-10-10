import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Joi from 'joi';
dotEnv.config();
//simple schema
const PromotionCampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  description: {
    type: String,
  },
  percent_discount: {
    type: Number,
    default: 0,
  },
  value_discount: {
    type: Number,
    default: 0,
  },
  created_at: { type: Date, default: Date.now },
});

const PromotionCampaign = mongoose.model('PromotionCampaign', PromotionCampaignSchema);

//function to validate PromotionCampaign
export const validatePromotionCampaign = promotionCampaign => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string(),
    percent_discount: Joi.number(),
    value_discount: Joi.number(),
  };

  return Joi.validate(promotionCampaign, schema);
};

export default PromotionCampaign;
