import Image from "../models/image.model";

const decodeBase64Image = dataString => {
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};
  response.contentType = matches[1];
  response.data = Buffer.from(matches[2], "base64");
  return response;
}

const uploadImage = async (req, res) => {
  const dataImage = decodeBase64Image(req.body.image)
  try {
    let image = new Image();
    if (req.body.product) {
      image.img.data = dataImage.data;
      image.img.contentType = dataImage.contentType;
      image.name = req.body.name;
      image.product = req.body.product;
    } else {
      image.img.data = dataImage.data;
      image.img.contentType = dataImage.contentType;
      image.name = req.body.name;
    }
    await image.save();
    res.status(200).send({
      success: true,
      message: "Upload image successfull"
    });
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};

const getImageById = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    if (!image)
      return res.status(400).send({
        success: false,
        message: "Image is not existed."
      });
    image.img.data = image.img.data.toString('base64');
    res.status(200).send({
      success: true,
      data: image
    });
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
};
export default {
  uploadImage,
  getImageById
};
