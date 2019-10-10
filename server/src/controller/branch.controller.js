import saveImage, { isBase64String } from './../middleware/saveImage';
import Branch, { validateBranch } from '../models/branch.model';
import { slugger } from './../middleware/utils';

const createBranch = async (req, res) => {
  try {
    // validate the request body first
    const { name, description, image } = req.body;
    const { error } = validateBranch(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    let imagePath = { message: image };
    if (isBase64String(image)) {
      imagePath = await saveImage(image, 'upload/branch');
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message,
        });
      }
    }
    //find an existing branch
    let branch = await Branch.findOne({ name });
    if (branch)
      return res.status(400).send({
        success: false,
        message: 'Branch already existed.',
      });

    branch = new Branch({
      name,
      slug: slugger(name),
      description,
      image: imagePath.message,
    });
    await branch.save();
    res.status(200).send({
      success: true,
      message: 'Add new branch successfull',
      branch,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllBranch = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let branch = await Branch.find()
      .sort('-created_at')
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      branch,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getBranchById = async (req, res) => {
  try {
    let branch = await Branch.findById(req.params.id);
    if (!branch)
      return res.status(400).send({
        success: false,
        message: 'Branch is not existed.',
      });
    res.status(200).send({
      success: true,
      branch,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateBranchById = async (req, res) => {
  try {
    if (req.body.name) {
      const branch = await Branch.findOne({ name: req.body.name });
      if (branch)
        return res.status(400).send({
          success: false,
          message: 'Branch already existed.',
        });
    }
    const updateObj = req.body;
    if (isBase64String(req.body.image)) {
      const imagePath = await saveImage(req.body.image, 'upload/branch');
      // console.log("imagepath", imagePath);
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

    let branch = await Branch.findByIdAndUpdate(req.params.id, {
      $set: updateObj,
    });
    if (!branch)
      return res.status(400).send({
        success: false,
        message: 'Branch is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Update branch successfull',
      branch,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteBranchById = async (req, res) => {
  try {
    let branch = await Branch.findByIdAndRemove(req.params.id);
    if (!branch)
      return res.status(400).send({
        success: false,
        message: 'Branch is not existed.',
      });
    res.status(200).send({
      success: true,
      message: 'Delete branch successfull',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
export default {
  createBranch,
  getBranchById,
  updateBranchById,
  deleteBranchById,
  getAllBranch,
};
