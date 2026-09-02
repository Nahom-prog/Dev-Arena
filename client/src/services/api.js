const API_URL = import.meta.env.VITE_API_URL || '';
const API_BASE = `${API_URL}/api`;

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
  getAllQuizzes: (params = {}) => {
    const query = new URLSearchParams();
    if (params.tag && params.tag !== 'all') query.append('tag', params.tag);
    if (params.difficulty && params.difficulty !== 'all') query.append('difficulty', params.difficulty);
    if (params.search) query.append('search', params.search);
    const qs = query.toString();
    return request(`/quizzes${qs ? `?${qs}` : ''}`);
  },
  getMyQuizzes: () => request('/quizzes/my/authored'),
  getDailyChallenge: () => request('/quizzes/daily'),
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

export const leaderboardApi = {
  getLeaderboard: () => request('/leaderboard'),
};

export const adminApi = {
  getStats: () => request('/admin/stats'),
  getUsers: (search = '') => request(`/admin/users${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  updateUser: (userId, payload) =>
    request(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  deleteUser: (userId) =>
    request(`/admin/users/${userId}`, {
      method: 'DELETE',
    }),
  getQuizzes: () => request('/admin/quizzes'),
  toggleQuizStatus: (quizId, status) =>
    request(`/admin/quizzes/${quizId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  deleteQuiz: (quizId) =>
    request(`/admin/quizzes/${quizId}`, {
      method: 'DELETE',
    }),
};


