import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  IDEA_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_IDEA,
  IDEA_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes'

const defaultState = {
  appName: 'My Ideas',
  token: null,
  viewChangeCounter: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.me : null
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case LOGOUT:
      return { ...state, redirectTo: '/home', token: null, currentUser: null }
    case IDEA_SUBMITTED:
      const redirectUrl = '/home'
      return { ...state, redirectTo: redirectUrl }
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/home',
        currentUser: action.error ? null : action.payload.me
      }
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/home',
        token: action.error ? null : action.payload.jwt,
        currentUser: action.error ? null : action.payload.me
      }
    case DELETE_IDEA:
      return { ...state, redirectTo: '/home' }
    case IDEA_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 }
    default:
      return state
  }
}
