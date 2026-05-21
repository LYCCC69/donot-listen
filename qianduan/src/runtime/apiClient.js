import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  response => {
    const body = response.data
    if (body.code !== 0) {
      return Promise.reject(new Error(body.msg || '请求失败'))
    }
    return body.data
  },
  error => {
    const res = error.response
    if (res) {
      const msg = res.data?.msg || res.statusText || '请求失败'
      if (res.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/home'
      }
      return Promise.reject(new Error(msg))
    }
    return Promise.reject(new Error('网络错误'))
  }
)

export function get (url, params) {
  return client.get(url, { params })
}

export function post (url, data) {
  return client.post(url, data)
}

export function del (url) {
  return client.delete(url)
}

export default {
  // Auth
  login: data => post('/auth/login', data),
  register: data => post('/auth/register', data),

  // Navigation
  getNavigation: () => get('/navigation'),

  // Listening
  getListeningList: params => get('/listening/list', params),
  getListeningDetail: id => get(`/listening/detail/${id}`),
  getTranscript: id => get(`/listening/transcript/${id}`),
  getListeningSet: params => get('/listening/set', params),

  // Feedback
  submitFeedback: data => post('/listening/feedback', data),

  // Learning records
  getLearningRecords: params => get('/user/learning-records', params),
  clearLearningRecords: () => del('/user/learning-records'),

  // Collections
  getCollections: params => get('/user/collections', params),
  addCollection: listeningId => post('/user/collections', { listeningId }),
  removeCollection: listeningId => del(`/user/collections/${listeningId}`),

  // User
  getUserProfile: () => get('/user/profile'),

  // AI
  getAiExplain: lineId => get('/ai/explain', { lineId })
}
