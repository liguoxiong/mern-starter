import Product, { validateProduct } from '../models/product.model';
import { PromotionCampaign, Branch, Category } from '../models';
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
      if (!isBase64String(item.url)) {
        imageSubmit.push(item);
      } else {
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
      }
    });

    let sale_price = original_price;
    if (promotion_campaign) {
      const currentCampaign = await PromotionCampaign.findById(promotion_campaign);
      const { percent_discount, value_discount } = currentCampaign;
      if (percent_discount) {
        sale_price -= Math.floor((percent_discount * original_price) / 100);
      }
      if (value_discount) {
        sale_price = sale_price - value_discount;
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
    const saveProduct = await Product.findById(product._id);
    res.status(200).send({
      success: true,
      message: 'Add new product successfull',
      product: saveProduct,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const createProductWithChild = async (req, res) => {
  try {
    // validate the request body first
    // const { error } = validateProduct(req.body);
    // if (error)
    //   return res.status(400).send({
    //     success: false,
    //     message: error.details[0].message,
    //   });
    let {
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
    if (image) {
      image.forEach(async item => {
        if (!isBase64String(item.url)) {
          imageSubmit.push(item);
        } else {
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
        }
      });
    }

    let sale_price = original_price;
    if (typeof category === 'object' && category !== null) {
      try {
        let createCategory = await Category.findOne({ name: category.name });
        if (createCategory) {
          category = createCategory._id.toString();
        } else {
          const slug = slugger(category.name);
          createCategory = new Category({ slug, ...category });
          await createCategory.save();
          category = createCategory._id.toString();
        }
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    }
    if (typeof branch === 'object' && branch !== null) {
      try {
        let createBranch = await Branch.findOne({ name: branch.name });
        if (createBranch) {
          branch = createBranch._id.toString();
        } else {
          const slug = slugger(branch.name);
          createBranch = new Branch({ slug, ...branch });
          await createBranch.save();
          branch = createBranch._id.toString();
        }
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    }

    if (typeof promotion_campaign === 'object' && promotion_campaign !== null) {
      try {
        let createPromotionCampaign = await PromotionCampaign.findOne({
          name: promotion_campaign.name,
        });
        if (createPromotionCampaign) {
          promotion_campaign = createPromotionCampaign._id.toString();
        } else {
          createPromotionCampaign = new PromotionCampaign(promotion_campaign);
          await createPromotionCampaign.save();
          promotion_campaign = createPromotionCampaign._id.toString();
        }
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    }

    if (promotion_campaign) {
      const currentCampaign = await PromotionCampaign.findById(promotion_campaign);
      const { percent_discount, value_discount } = currentCampaign;
      if (percent_discount) {
        sale_price -= Math.floor((percent_discount * original_price) / 100);
      }
      if (value_discount) {
        sale_price = sale_price - value_discount;
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
    const saveProduct = await Product.findById(product._id);
    res.status(200).send({
      success: true,
      message: 'Add new product successfull',
      product: saveProduct,
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
    let product = await Product.findById(req.params.id)
      .populate('category')
      .populate('promotion_campaign')
      .populate('branch');
    if (!product)
      return res.status(400).send({
        success: false,
        message: 'Product is not existed.',
      });
    res.status(200).send({
      success: true,
      product,
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
    if (req.query.branch) {
      const branch = mongoose.Types.ObjectId(req.query.branch);
      query.branch = branch;
    }
    let [count, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort('-created_at')
        .limit(limitValue)
        .skip(skipValue)
        .populate('category')
        .populate('promotion_campaign')
        .populate('branch'),
    ]);

    return res.status(200).send({
      success: true,
      products,
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
    const { image, name, original_price, promotion_campaign, haveSold, ...rst } = req.body;
    let originProduct = await Product.findById(req.params.id)
      .populate('category')
      .populate('promotion_campaign')
      .populate('branch');
    const submitObj = req.body;
    let sale_price = originProduct.original_price;
    let promotionCampaign = originProduct.promotion_campaign;
    if (original_price) {
      sale_price = original_price;
    }
    if (promotion_campaign) {
      promotionCampaign = await PromotionCampaign.findById(promotion_campaign);
    }
    const { percent_discount, value_discount } = promotionCampaign;
    if (percent_discount) {
      sale_price -= Math.floor((percent_discount * sale_price) / 100);
    }
    if (value_discount) {
      sale_price -= value_discount;
    }
    submitObj.promotion_campaign = promotionCampaign._id.toString();
    submitObj.sale_price = sale_price;

    if (name) {
      const product = await Product.findOne({ name });
      if (product && product._id.toString() !== req.params.id)
        return res.status(400).send({
          success: false,
          message: 'Product name already existed.',
        });
      submitObj.slug = slugger(name);
    }
    if (image) {
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
        } else {
          imageSubmit.push({
            uid: item.uid,
            name: item.name,
            status: item.status,
            url: item.url,
          });
        }
      }

      submitObj.image = imageSubmit;
    }
    submitObj.updated_at = new Date();
    let product = await Product.findByIdAndUpdate(req.params.id, {
      $set: submitObj,
    });
    if (!product)
      return res.status(400).send({
        success: false,
        message: 'Product is not existed.',
      });
    product = await Product.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: 'Update product successfull',
      product,
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

const warehousing = async (req, res) => {
  const { payload } = req.body;
  // payload: [{model: string, inStock: number}]
  try {
    let products = [];
    await Promise.all(
      payload.map(async item => {
        const product = await Product.findOne({ model: item.model });
        product.stock += item.inStock;
        products.push(product);
        await product.save();
      }),
    );
    res.status(200).send({
      success: true,
      message: 'Add Stock successfull',
      products,
      total: products.length,
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
  createProductWithChild,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProduct,
  warehousing,
};
