import * as types from '../actions/types';

const INIT = {
  list: [],
  public: [],
  users: [],
  invites: []
}

export default function projectReducer(state = INIT, action = {}){
  switch(action.type){
    case types.SET_PROJECT_INVITES:
      return {
        ...state,
        invites: action.invites,
      }
    case types.SET_USER_SUGGESTIONS:
      return {
        ...state,
        users: action.users
      }
    case types.SET_PUBLIC_PROJECTS:
      return {
        ...state,
        public: action.projects
      }
    case types.ADD_PROJECT:
      return {
        ...state,
        list: state.list.concat([action.project])
      }
    case types.SET_PROJECTS:
      return {
        ...state,
        list: action.projects
      }
    default:
      return state
  }
}
