import mongoose from "mongoose";
import dotEnv from "dotenv";
import jwt from "jsonwebtoken";
import Joi from "joi";
dotEnv.config();
//simple schema
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  avatar: {
    type: String,
    required: false
  },
  //give different access rights if admin or not
  role: {
    type: Number,
    default: 1 // 0 is root user
  }
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.SECRET_KEY
  ); //get the private key from the config file -> environment variable
  return token;
};

const User = mongoose.model("User", UserSchema);

//function to validate user
export const validateUser = user => {
  const schema = {
    userName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    fullName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    avatar: Joi.string()
      .allow("")
      .optional(),
    role: Joi.Number()
  };

  return Joi.validate(user, schema);
};

export default User;
