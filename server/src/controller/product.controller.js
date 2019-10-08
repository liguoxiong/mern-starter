import Product, { validateProduct } from "../models/product.model";
import mongoose from "mongoose";
import saveImage, { isBase64String } from "./../middleware/saveImage";

const createProduct = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateProduct(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message
      });
    const { image } = req.body;
    let imageSubmit = [];
    image.forEach(async item => {
      const imagePath = await saveImage(item.url);
      // console.log("imagepath", imagePath);
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message
        });
      }
      imageSubmit.push({
        uid: item.uid,
        name: item.name,
        status: item.status,
        url: imagePath.message
      });
    });

    //find an existing category
    let product = await Product.findOne({ name: req.body.name });
    if (product)
      return res.status(400).send({
        success: false,
        message: "Product already existed."
      });

    product = new Product({
      name: req.body.name,
      description: req.body.description,
      documentation: req.body.documentation,
      origin: req.body.origin,
      model_number: req.body.model_number,
      dilivery_time: req.body.dilivery_time,
      warranty_time: req.body.warranty_time,
      image: imageSubmit,
      isShow: req.body.isShow || false,
      category: mongoose.Types.ObjectId(req.body.category)
    });
    await product.save();
    res.status(200).send({
      success: true,
      message: "Add new product successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate("category");
    if (!product)
      return res.status(400).send({
        success: false,
        message: "Product is not existed."
      });
    res.status(200).send({
      success: true,
      data: product
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    let limitValue = parseInt(req.query.limit) || 10;
    let skipValue = parseInt(req.query.skip) || 0;

    const query = {};
    if (req.query.isShow) {
      const isShow = req.query.isShow === "true";
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
        .sort("-created_at")
        .limit(limitValue)
        .skip(skipValue)
        .populate("category")
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
      total: count
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
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
            message: imagePath.message
          });
        }
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: imagePath.message
        });
      } else if (item.thumbUrl) {
        const imagePath = await saveImage(item.thumbUrl);
        if (!imagePath.success) {
          return res.status(500).send({
            success: false,
            message: imagePath.message
          });
        }
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: imagePath.message
        });
      } else {
        imageSubmit.push({
          uid: item.uid,
          name: item.name,
          status: item.status,
          url: item.url
        });
      }
    }
    let product = await Product.findByIdAndUpdate(req.params.id, {
      $set: { ...rst, image: imageSubmit }
    });
    if (!product)
      return res.status(400).send({
        success: false,
        message: "Product is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Update product successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    let product = await Product.findByIdAndRemove(req.params.id);
    if (!product)
      return res.status(400).send({
        success: false,
        message: "Product is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Delete product successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

export default {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProduct
};
