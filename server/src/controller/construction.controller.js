import saveImage, {isBase64String} from "./../middleware/saveImage";
import Construction, {
  validateConstruction
} from "../models/construction.model";

const createConstruction = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateConstruction(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message
      });
    const { image } = req.body;
    let imageSubmit = [];
    image.forEach(async item => {
      const imagePath = await saveImage(item.url);
      console.log("imagepath", imagePath);
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

    //find an existing construction
    let construction = await Construction.findOne({ title: req.body.title });
    if (construction)
      return res.status(400).send({
        success: false,
        message: "Construction already existed."
      });

    construction = new Construction({
      title: req.body.title,
      description: req.body.description,
      image: imageSubmit
    });
    await construction.save();
    res.status(200).send({
      success: true,
      message: "Add new construction successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getAllConstruction = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;
    let construction = await Construction.find()
      .sort("-created_at")
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).send({
      success: true,
      data: construction
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getConstructionById = async (req, res) => {
  try {
    let construction = await Construction.findById(req.params.id);
    if (!construction)
      return res.status(400).send({
        success: false,
        message: "Construction is not existed."
      });
    res.status(200).send({
      success: true,
      data: construction
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const updateConstructionById = async (req, res) => {
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
    let construction = await Construction.findByIdAndUpdate(req.params.id, {
      $set: { ...rst, image: imageSubmit }
    });
    if (!construction)
      return res.status(400).send({
        success: false,
        message: "Construction is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Update construction successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const deleteConstructionById = async (req, res) => {
  try {
    let construction = await Construction.findByIdAndRemove(req.params.id);
    if (!construction)
      return res.status(400).send({
        success: false,
        message: "Construction is not existed."
      });
    res.status(200).send({
      success: true,
      message: "Delete construction successfull"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};
export default {
  createConstruction,
  getConstructionById,
  updateConstructionById,
  deleteConstructionById,
  getAllConstruction
};
