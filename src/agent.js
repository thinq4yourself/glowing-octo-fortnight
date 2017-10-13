import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'https://small-project-api.herokuapp.com'

const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/me'),
  login: (email, password) =>
    requests.post('/access-tokens', { email, password }),
  register: (name, email, password) =>
    requests.post('/users', { name, email, password }),
  save: user =>
    requests.put('/users', { user }),
  refresh: () =>
    requests.put('/access-tokens/refresh'),
  logout: () =>
    requests.del('/access-tokens')
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = idea => Object.assign({}, idea, { slug: undefined })
const Ideas = {
  all: page =>
    requests.get(`/ideas?${limit(5, page)}`),
  del: slug =>
    requests.del(`/ideas/${slug}`),
  get: slug =>
    requests.get(`/ideas/${slug}`),
  update: idea =>
    requests.put(`/ideas/${idea.slug}`, { idea: omitSlug(idea) }),
  create: idea =>
    requests.post('/ideas', { idea })
}

const Profile = {
  get: name =>
    requests.get('/me')
}

export default {
  Ideas,
  Auth,
  Profile,
  setToken: _token => { token = _token }
}
