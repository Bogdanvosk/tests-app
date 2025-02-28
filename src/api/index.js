import { instance } from './instance';

// AUTH
export const signUpReq = async user => {
  const { data } = await instance.post('/signup', user);

  return data;
};

export const signInReq = async user => {
  const { data } = await instance.post('/signin', user);

  return data;
};

export const logoutReq = async () => {
  const { data } = await instance.delete('/logout');

  return data;
};

export const getUserReq = async () => {
  const { data } = await instance.get('/users/current');

  return data;
};

// TEST
export const getCurrentTestReq = async id => {
  const { data } = await instance.get(`/tests/${id}`);

  return data;
};

export const createTestReq = async title => {
  const { data } = await instance.post('/tests', title);

  return data;
};

export const updateTestReq = async ({ testId, title }) => {
  const { data } = await instance.patch(`/tests/${testId}`, { title });

  return data;
};

export const deleteTestReq = async testId => {
  const { data } = await instance.delete(`/tests/${testId}`);

  return data;
};

export const getAllTestsReq = async (
  { page = 1, per = 5, search = '', sort = 'created_at_desc' } = {
    page: 1,
    per: 5,
    search: '',
    sort: 'created_at_desc'
  }
) => {
  const { data } = await instance.get(
    `/tests?page=${page}&per=${per}&search=${search}&sort=${sort}`
  );

  return data;
};

// QUESTION
export const addQuestionReq = async ({ testId, title, question_type, answer }) => {
  const { data } = await instance.post(`/tests/${testId}/questions`, {
    title,
    question_type,
    answer
  });

  return data;
};

export const updateQuestionReq = async ({ questionId, ...newData }) => {
  const { data } = await instance.patch(`/questions/${questionId}`, newData);

  return data;
};

export const deleteQuestionReq = async questionId => {
  const { data } = await instance.delete(`/questions/${questionId}`);

  return data;
};

// ANSWER
export const addAnswerReq = async ({ questionId, answer }) => {
  const { data } = await instance.post(`/questions/${questionId}/answers`, answer);

  return { questionId, data };
};

export const updateAnswerReq = async ({ answerId, newData }) => {
  const { data } = await instance.patch(`/answers/${answerId}`, newData);

  return data;
};

export const deleteAnswerReq = async ({ answerId }) => {
  const { data } = await instance.delete(`/answers/${answerId}`);

  return data;
};

export const updatePositionReq = async ({ answerId, position }) => {
  const { data } = await instance.patch(`/answers/${answerId}/insert_at/${position}`);

  return data;
};
