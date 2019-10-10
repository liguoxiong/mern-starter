import PromotionCampaign, { validatePromotionCampaign } from '../models/promotionCampaign.model';
import mongoose from 'mongoose';

const createPromotionCampaign = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validatePromotionCampaign(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    const { name, description, percent_discount, value_discount } = req.body;
    //find an existing category
    let promotionCampaign = await PromotionCampaign.findOne({ name });
    if (promotionCampaign)
      return res.status(400).send({
        success: false,
        message: 'PromotionCampaign already existed.',
      });

    promotionCampaign = new PromotionCampaign({
      name,
      description,
      percent_discount,
      value_discount,
    });
    await promotionCampaign.save();
    res.status(200).send({
      success: true,
      message: 'Add new promotionCampaign successfull',
      promotionCampaign,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getPromotionCampaignById = async (req, res) => {
  try {
    let promotionCampaign = await PromotionCampaign.findById(req.params.id);
    if (!promotionCampaign)
      return res.status(400).send({
        success: false,
        message: 'PromotionCampaign is not existed.',
      });
    res.status(200).send({
      success: true,
      promotionCampaign,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllPromotionCampaign = async (req, res) => {
  try {
    let limitValue = parseInt(req.query.limit) || 10;
    let skipValue = parseInt(req.query.skip) || 0;

    const query = {};
    if (req.query.isShow) {
      const isShow = req.query.isShow === 'true';
      query.isShow = isShow;
    }
    if (req.query.pageSize) {
      const pageSize = parseInt(req.query.pageSize);
      limitValue = pageSize;
    }
    if (req.query.page) {
      const page = parseInt(req.query.page);
      skipValue = limitValue * page - limitValue;
    }
    if (req.query.category) {
      const category = mongoose.Types.ObjectId(req.query.category);
      query.category = category;
    }
    let [count, promotionCampaign] = await Promise.all([
      PromotionCampaign.countDocuments(query),
      PromotionCampaign.find(query)
        .sort('-created_at')
        .limit(limitValue)
        .skip(skipValue),
    ]);
    return res.status(200).send({
      success: true,
      promotionCampaign,
      total: count,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updatePromotionCampaignById = async (req, res) => {
  try {
    let promotionCampaign = await PromotionCampaign.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!promotionCampaign)
      return res.status(400).send({
        success: false,
        message: 'PromotionCampaign is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Update promotionCampaign successfull',
      promotionCampaign,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deletePromotionCampaignById = async (req, res) => {
  try {
    let promotionCampaign = await PromotionCampaign.findByIdAndRemove(req.params.id);
    if (!promotionCampaign)
      return res.status(400).send({
        success: false,
        message: 'PromotionCampaign is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Delete promotionCampaign successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export default {
  createPromotionCampaign,
  getPromotionCampaignById,
  updatePromotionCampaignById,
  deletePromotionCampaignById,
  getAllPromotionCampaign,
};
