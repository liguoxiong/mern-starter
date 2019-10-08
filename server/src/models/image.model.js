import mongoose from "mongoose";
import dotEnv from 'dotenv'
dotEnv.config()
//simple schema
const ImageSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String},
  name: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  created_at: { type: Date, default: Date.now },
});


const Image = mongoose.model('Image', ImageSchema);

export default Image;
