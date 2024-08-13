import api from './api';

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then(res => {
    localStorage.setItem('token', res.data.token);
    return res.data;
  });

export const register = (name, email, password) =>
  api.post('/auth/register', { name, email, password }).then(res => {
    localStorage.setItem('token', res.data.token);
    return res.data;
  });

export const logout = () => {
  localStorage.removeItem('token');
};