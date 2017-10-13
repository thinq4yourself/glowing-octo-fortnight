import {
  IDEA_FAVORITED,
  IDEA_UNFAVORITED,
  SET_PAGE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case IDEA_FAVORITED:
    case IDEA_UNFAVORITED:
      return {
        ...state,
        ideas: state.ideas.map(idea => {
          if (idea.slug === action.payload.idea.slug) {
            return {
              ...idea
            }
          }
          return idea
        })
      }
    case SET_PAGE:
      return {
        ...state,
        ideas: action.payload.ideas,
        currentPage: action.page
      }
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        ideas: action.payload[1],
        currentPage: 0,
        tab: action.tab
      }
    case HOME_PAGE_UNLOADED:
      return {}
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        ideas: action.payload.ideas,
        tab: action.tab,
        currentPage: 0
      }
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        ideas: action.payload[1].ideas,
        currentPage: 0
      }
    case PROFILE_PAGE_UNLOADED:
    default:
      return state
  }
}
