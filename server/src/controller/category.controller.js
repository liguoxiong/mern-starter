import saveImage, { isBase64String } from './../middleware/saveImage';
import Category, { validateCategory } from '../models/category.model';
import { slugger } from './../middleware/utils';

const createCategory = async (req, res) => {
  try {
    // validate the request body first
    const { name, description, image } = req.body;
    const slug = slugger(name);
    const { error } = validateCategory(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    let imagePath = { message: image };
    if (isBase64String(image)) {
      imagePath = await saveImage(image, 'upload/category');
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message,
        });
      }
    }
    //find an existing category
    let category = await Category.findOne({ name });
    if (category)
      return res.status(400).send({
        success: false,
        message: 'Category already existed.',
      });

    category = new Category({
      name,
      slug,
      description,
      image: imagePath.message,
    });
    await category.save();
    res.status(200).send({
      success: true,
      message: 'Add new category successfull',
      category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let category = await Category.find()
      .sort('-created_at')
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      return res.status(400).send({
        success: false,
        message: 'Category is not existed.',
      });
    res.status(200).send({
      success: true,
      category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    if (req.body.name) {
      const category = await Category.findOne({ name: req.body.name });
      if (category && category._id.toString() !== req.params.id)
        return res.status(400).send({
          success: false,
          message: 'Category name already existed.',
        });
    }
    const updateObj = req.body;
    if (isBase64String(req.body.image)) {
      const imagePath = await saveImage(req.body.image, 'upload/category');
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message,
        });
      }
      updateObj.image = imagePath.message;
    }
    if (updateObj.name) {
      updateObj.slug = slugger(updateObj.name);
    }
    let category = await Category.findByIdAndUpdate(req.params.id, {
      $set: updateObj,
    });
    if (!category)
      return res.status(400).send({
        success: false,
        message: 'Category is not existed.',
      });
    category = await Category.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: 'Update category successfull',
      category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);
    if (!category)
      return res.status(400).send({
        success: false,
        message: 'Category is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Delete category successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
export default {
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCategory,
};
