import { instance } from './instance';

export const signUpReq = async (user) => {
  const { data } = await instance.post('/signup', user);

  return data;
};

export const signInReq = async (user) => {
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

export const getCurrentTestReq = async (id) => {
  const { data } = await instance.get(`/tests/${id}`);

  return data;
};

export const createTestReq = async (title) => {
  const { data } = await instance.post('/tests', title);

  return data;
};

export const getAllTestsReq = async () => {
  const { data } = await instance.get('/tests');

  return data;
};

export const addQuestionReq = async ({
  testId,
  title,
  question_type,
  answer,
}) => {
  const { data } = await instance.post(`/tests/${testId}/questions`, {
    title,
    question_type,
    answer,
  });

  return data;
};

export const addAnswersReq = async (questionId, answers) => {
  const answersData = [];

  answers.forEach(async (answer) => {
    const { data } = await instance.post(
      `/questions/${questionId}/answers`,
      answer
    );
    answersData.push(data);
  });

  return answersData;
};

export const deleteQuestionReq = async (questionId) => {
  const { data } = await instance.delete(`/questions/${questionId}`);

  return data;
};

export const updateTestReq = async ({ testId, title }) => {
  const { data } = await instance.patch(`/tests/${testId}`, { title });

  return data;
};

export const updateQuestionReq = async ({ questionId, ...newData }) => {
  const { data } = await instance.patch(`/questions/${questionId}`, newData);

  return data;
};

export const deleteAnswerReq = async ({ answerId, questionId }) => {
  const { data } = await instance.delete(`/answers/${answerId}`);

  return data;
};

// export const addAnswerReq = async ({ answer, questionId }) => {
//   const { data } = await instance.post(`/questions/${questionId}/answers`, {
//     answer,
//   });

//   return data;
// };
