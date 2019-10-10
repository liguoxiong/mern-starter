import Product, { validateProduct } from '../models/product.model';
import PromotionCampaign from '../models/promotionCampaign.model';
import mongoose from 'mongoose';
import { slugger } from './../middleware/utils';
import saveImage, { isBase64String } from './../middleware/saveImage';

const createProduct = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateProduct(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    const {
      name,
      overview,
      original_price,
      promotion_campaign,
      branch,
      origin,
      model,
      dilivery_time,
      warranty_time,
      isShow,
      stock,
      haveSold,
      category,
      image,
    } = req.body;
    let product = await Product.findOne({ name });
    if (product)
      return res.status(400).send({
        success: false,
        message: 'Product already existed.',
      });

    const slug = slugger(name);
    let imageSubmit = [];
    image.forEach(async item => {
      const imagePath = await saveImage(item.url);
      // console.log("imagepath", imagePath);
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message,
        });
      }
      imageSubmit.push({
        uid: item.uid,
        name: item.name,
        status: item.status,
        url: imagePath.message,
      });
    });

    //find an existing category
    let sale_price = original_price;
    if (promotion_campaign) {
      const currentCampaign = await PromotionCampaign.findById(promotion_campaign);
      const { percent_discount, value_discount } = currentCampaign;
      if (percent_discount) {
        sale_price = Math.floor((percent_discount * original_price) / 100);
      }
      if (value_discount) {
        sale_price = original_price - value_discount;
      }
    }

    product = new Product({
      name,
      slug,
      overview,
      original_price,
      sale_price,
      promotion_campaign: mongoose.Types.ObjectId(promotion_campaign),
      branch: mongoose.Types.ObjectId(branch),
      origin,
      model,
      dilivery_time,
      warranty_time,
      isShow,
      stock,
      category,
      image: imageSubmit,
      category: mongoose.Types.ObjectId(category),
    });
    await product.save();
    res.status(200).send({
      success: true,
      message: 'Add new product successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate('category');
    if (!product)
      return res.status(400).send({
        success: false,
        message: 'Product is not existed.',
      });
    res.status(200).send({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllProduct = async (req, res) => {
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
    let [count, product] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort('-created_at')
        .limit(limitValue)
        .skip(skipValue)
        .populate('category'),
    ]);
    // const count = await Product.count(query);
    // let product = await Product.find(query)
    //   .sort("-created_at")
    //   .limit(limitValue)
    //   .skip(skipValue)
    //   .populate("category");

    return res.status(200).send({
      success: true,
      data: product,
      total: count,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { image, ...rst } = req.body;
    let imageSubmit = [];
    for (const item of image) {
      if (isBase64String(item.url)) {
        const imagePath = await saveImage(item.url);
        if (!imagePath.success) {
          return res.status(500).send({
            success: false,
            message: imagePath.message,
          });
        }
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: imagePath.message,
        });
      } else if (item.thumbUrl) {
        const imagePath = await saveImage(item.thumbUrl);
        if (!imagePath.success) {
          return res.status(500).send({
            success: false,
            message: imagePath.message,
          });
        }
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: imagePath.message,
        });
      } else {
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: item.url,
        });
      }
    }
    let product = await Product.findByIdAndUpdate(req.params.id, {
      $set: { ...rst, image: imageSubmit },
    });
    if (!product)
      return res.status(400).send({
        success: false,
        message: 'Product is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Update product successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    let product = await Product.findByIdAndRemove(req.params.id);
    if (!product)
      return res.status(400).send({
        success: false,
        message: 'Product is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Delete product successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export default {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProduct,
};
