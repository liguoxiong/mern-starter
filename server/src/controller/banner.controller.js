import Banner, { validateBanner } from "../models/banner.model";
import saveImage, { isBase64String } from "./../middleware/saveImage";

const createBanner = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateBanner(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message
      });

    const imagePath = await saveImage(req.body.image);
    console.log("imagepath", imagePath);
    if (!imagePath.success) {
      return res.status(500).send({
        success: false,
        message: imagePath.message
      });
    }
    //find an existing banner
    // let banner = await Banner.findOne({ title: req.body.title });
    // if (banner)
    //   return res.status(400).send({
    //     success: false,
    //     message: "Banner already existed."
    //   });

    const banner = new Banner({
      title: req.body.title,
      description: req.body.description,
      image: imagePath.message
    });
    await banner.save();
    res.status(200).send({
      success: true,
      message: "Add new banner successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let banner = await Banner.find()
      .sort("-created_at")
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      data: banner
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getBannerById = async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);
    if (!banner)
      return res.status(400).send({
        success: false,
        message: "Banner is not existed."
      });
    res.status(200).send({
      success: true,
      data: banner
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const updateBannerById = async (req, res) => {
  try {
    const updateObj = req.body;
    if (isBase64String(req.body.image)) {
      const imagePath = await saveImage(req.body.image);
      // console.log("imagepath", imagePath);
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message
        });
      }
      updateObj.image = imagePath.message;
      // console.log('patch', updateObj);
    }
  
    let banner = await Banner.findByIdAndUpdate(req.params.id, {
      $set: updateObj
    });
    if (!banner)
      return res.status(400).send({
        success: false,
        message: "Banner is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Update banner successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const deleteBannerById = async (req, res) => {
  try {
    let banner = await Banner.findByIdAndRemove(req.params.id);
    if (!banner)
      return res.status(400).send({
        success: false,
        message: "Banner is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Delete banner successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};
export default {
  createBanner,
  getBannerById,
  updateBannerById,
  deleteBannerById,
  getAllBanner
};
