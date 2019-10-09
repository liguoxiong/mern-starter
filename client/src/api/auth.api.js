import axios from 'axios';

const login = (userName, password) =>
  axios.post('/api/user/login', { userName, password }).then(res => res.data);
const logout = () => axios.get('/api/user/logout').then(res => res.data);
const getUser = () => axios.get('/api/user').then(res => res.data);
const register = user => axios.post('/api/user/register', { ...user }).then(res => res.data);
const current = () => axios.get('/api/user').then(res => res.data);

const auth = { login, register, current, logout, getUser };
export default auth;
