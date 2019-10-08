import saveImage, { isBase64String } from "./../middleware/saveImage";
import Info, { validateInfo } from "../models/info.model";

const createInfo = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateInfo(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message
      });

    const imagePath = await saveImage(req.body.logo);
    console.log("imagepath", imagePath);
    if (!imagePath.success) {
      return res.status(500).send({
        success: false,
        message: imagePath.message
      });
    }
    //find an existing info
    let info = await Info.findOne({ company: req.body.company });
    if (info)
      return res.status(400).send({
        success: false,
        message: "Info already existed."
      });

    info = new Info({
      company: req.body.company,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      facebook: req.body.facebook,
      messenger: req.body.messenger,
      zalo: req.body.zalo,
      skype: req.body.skype,
      viber: req.body.viber,
      logo: imagePath.message
    });
    await info.save();
    res.status(200).send({
      success: true,
      message: "Add new info successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getAllInfo = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let info = await Info.find()
      .sort("-created_at")
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      data: info
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getInfoById = async (req, res) => {
  try {
    let info = await Info.findById(req.params.id);
    if (!info)
      return res.status(400).send({
        success: false,
        message: "Info is not existed."
      });
    res.status(200).send({
      success: true,
      data: info
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const updateInfoById = async (req, res) => {
  try {
    const updateObj = req.body;
    // console.log('obj', req.body)
    if (isBase64String(req.body.logo)) {
      // console.log('isBase64')
      const imagePath = await saveImage(req.body.logo);
      // console.log("imagepath", imagePath);
      if (!imagePath.success) {
        return res.status(500).send({
          success: false,
          message: imagePath.message
        });
      }
      updateObj.logo = imagePath.message;
      // console.log('patch', updateObj);
    }
  
    let info = await Info.findByIdAndUpdate(req.params.id, {
      $set: updateObj
    });
    if (!info)
      return res.status(400).send({
        success: false,
        message: "Info is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Update info successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const deleteInfoById = async (req, res) => {
  try {
    let info = await Info.findByIdAndRemove(req.params.id);
    if (!info)
      return res.status(400).send({
        success: false,
        message: "Info is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Delete info successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

export default {
  createInfo,
  getInfoById,
  updateInfoById,
  deleteInfoById,
  getAllInfo
};
