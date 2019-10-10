import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const isBase64String = dataString => {
  const base64Regx = /^data:([A-Za-z-+/]+);base64,(.+)$/;
  return base64Regx.test(dataString);
  // const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  // return matches.length === 3;
};

const decodeBase64Image = dataString => {
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};

  if (!matches || matches.length !== 3) {
    return {
      success: false,
      message: 'Invalid input string',
    };
  }
  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
};

const saveImage = async (imageData, pathToSave) => {
  try {
    // console.log("saving init");
    const imageBuffer = decodeBase64Image(imageData);
    // console.log(imageBuffer);
    const uploadPath = path.join(__dirname, 'public');
    const seed = crypto.randomBytes(20);
    const uniqueSHA1String = crypto
      .createHash('sha1')
      .update(seed)
      .digest('hex');
    const imageTypeRegularExpression = /\/(.*?)$/;
    const imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
    const uniqueRandomImageName = 'image-' + uniqueSHA1String + '.' + imageTypeDetected[1];
    const imagePath = uploadPath + `/${pathToSave}/` + uniqueRandomImageName;
    try {
      fs.writeFile(imagePath, imageBuffer.data, function(err) {
        return {
          success: false,
          message: err,
        };
      });
      return {
        success: true,
        message: `/public/${pathToSave}/${uniqueRandomImageName}`,
      };
    } catch (error) {
      console.log('writeFile err');
      return {
        success: false,
        // message: "writeFile err"
        message: error.message,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
export default saveImage;
