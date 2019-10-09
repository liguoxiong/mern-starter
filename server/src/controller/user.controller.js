import bcrypt from 'bcrypt';
import qs from 'qs';
import User, { validateUser } from './../models/user.model';
import saveImage, { isBase64String } from './../middleware/saveImage';

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send({
    success: true,
    user,
  });
};

const userRegister = async (req, res) => {
  try {
    // validate the request body first
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
      });

    //find an existing user
    let user = await User.findOne({ userName: req.body.userName });
    if (user)
      return res.status(400).send({
        success: false,
        message: 'User already registered.',
      });

    let avatar = `https://ui-avatars.com/api/?name=${req.body.fullName}`;
    if (req.body.avatar && isBase64String(req.body.avatar)) {
      avatar = await saveImage(req.body.avatar);
    }

    user = new User({
      userName: req.body.userName,
      fullName: req.body.fullName,
      password: req.body.password,
      role: req.body.role || 1,
      email: req.body.email,
      avatar,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();
    res
      .cookie('token', token, {
        maxAge: 900000,
        httpOnly: true,
      })
      .header('x-auth-token', token)
      .status(200)
      .send({
        success: true,
        user: {
          _id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          role: user.role || 1,
          email: user.email,
          avatar: user.avatar,
        },
      });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ userName: req.body.userName });
    if (!user)
      return res.status(404).send({
        success: false,
        message: 'User not found!',
      });
    const result = bcrypt.compareSync(req.body.password, user.password);
    if (!result)
      return res.status(401).send({
        success: false,
        message: 'Password not valid!',
      });
    const token = user.generateAuthToken();
    res
      .cookie('token', token, {
        maxAge: 900000,
        httpOnly: true,
      })
      .status(200)
      .header('x-auth-token', token)
      .send({
        success: true,
        user: {
          _id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          role: user.role || 1,
          email: user.email,
          avatar: user.avatar,
        },
      });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const userLogout = (req, res) => {
  res
    .clearCookie('token')
    .status(200)
    .header('x-auth-token', '')
    .send({
      success: true,
      message: 'Logout successful',
    });
};
export default {
  getCurrentUser,
  userRegister,
  userLogin,
  userLogout,
};
