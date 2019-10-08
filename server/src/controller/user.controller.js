import bcrypt from 'bcrypt'
import qs from 'qs'
import User, {validateUser} from './../models/user.model'

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({
    success: true,
    data: user
  });
};

const getCurrentUserV2 = async (req, res) => {
  const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    let user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = await User.findById(token.id).select("-password");
      if (userItem) {
        user = {permissions: {role: 'admin'}, ...userItem}
      }
    }
    response.user = user
    res.json(response)
}

const userRegister = async (req, res) => {
  // validate the request body first
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({
    success: false,
    message:error.details[0].message
  });

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({
    success: false,
    message:"User already registered."
  });

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
}

const userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return  res.status(404).send({
      success: false,
      message:'User not found!'
    });
    const  result  =  bcrypt.compareSync(req.body.password, user.password);
    if(!result) return  res.status(401).send({
      success: false,
      message:'Password not valid!'
    });
    const token = user.generateAuthToken();
    const now = new Date()
    now.setDate(now.getDate() + 1)
    res.cookie(
      'token',
      JSON.stringify({ id: user._id, deadline: now.getTime() }),
      {
        maxAge: 900000,
        httpOnly: true,
      }
    )
    res.status(200).header("x-auth-token", token).send({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
}

const userLogout = (req, res) => {
  res.clearCookie('token')
  res.status(200).header("x-auth-token", '').send({
    success: true,
    message: 'Logout successful'
  })
}
export default {
  getCurrentUser,
  getCurrentUserV2,
  userRegister,
  userLogin,
  userLogout
}