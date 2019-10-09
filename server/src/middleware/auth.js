import jwt from 'jsonwebtoken';
import qs from 'qs';
import dotEnv from 'dotenv';
dotEnv.config();

const auth = (req, res, next) => {
  //get the token from the header if present
  let cookieToken = '';
  if (req.headers.cookie) {
    const { cookie } = req.headers;
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    if (cookies.token) {
      cookieToken = cookies.token;
    }
  }
  const token = req.headers['x-access-token'] || req.headers['authorization'] || cookieToken;
  //if no token found, return response (without going to the next middelware)
  if (!token)
    return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send({ success: false, message: 'Invalid token.' });
  }
};

export default auth;
