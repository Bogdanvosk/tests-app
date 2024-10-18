import { instance } from './instance';

export const signUpReq = async (user) => {
  const { data } = await instance.post('/signup', user);

  return data;
};

export const signInReq = async (user) => {
  const { data } = await instance.post('/signin', user);

  return data;
};

export const getUserReq = async () => {
  const { data } = await instance.get('/users/current');

  console.log('data', data);

  return data;
};

export const getCurrentTestReq = async (id) => {
  const { data } = await instance.get(`/tests/${id}`);

  return data;
};
