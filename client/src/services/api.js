const API_BASE = '/api';

const getToken = () => localStorage.getItem('quiz_token');

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getMe: () => request('/auth/me'),
};

export const quizApi = {
  createQuiz: (payload) =>
    request('/quizzes', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAllQuizzes: () => request('/quizzes'),
  getQuizById: (quizId) => request(`/quizzes/${quizId}`),
  publishQuiz: (quizId) =>
    request(`/quizzes/${quizId}/publish`, {
      method: 'PATCH',
    }),
  submitQuiz: (quizId, answers) =>
    request(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
};

export const questionApi = {
  createQuestion: (payload) =>
    request('/questions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getQuestionsByQuiz: (quizId) => request(`/questions/quiz/${quizId}`),
};
