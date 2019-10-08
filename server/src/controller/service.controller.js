import saveImage, { isBase64String } from "./../middleware/saveImage";
import Service, { validateService } from "../models/service.model";

const createService = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateService(req.body);
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

    //find an existing service
    let service = await Service.findOne({ title: req.body.title });
    if (service)
      return res.status(400).send({
        success: false,
        message: "Service already existed."
      });

    service = new Service({
      title: req.body.title,
      description: req.body.description,
      image: imagePath.message
    });
    await service.save();
    res.status(200).send({
      success: true,
      message: "Add new service successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getAllService = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let service = await Service.find()
      .sort("-created_at")
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      data: service
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service)
      return res.status(400).send({
        success: false,
        message: "Service is not existed."
      });
    res.status(200).send({
      success: true,
      data: service
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const updateServiceById = async (req, res) => {
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
    }
  
    let service = await Service.findByIdAndUpdate(req.params.id, {
      $set: updateObj
    });
    if (!service)
      return res.status(400).send({
        success: false,
        message: "Service is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Update service successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const deleteServiceById = async (req, res) => {
  try {
    let service = await Service.findByIdAndRemove(req.params.id);
    if (!service)
      return res.status(400).send({
        success: false,
        message: "Service is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Delete service successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};
export default {
  createService,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  getAllService
};
