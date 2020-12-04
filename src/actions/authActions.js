import * as types from './types';
const conf = require('../conf')


export function signup(name, username, password, cb){
  return (dispatch) => {
    return fetch(`${conf.baseURL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: name,
      username: username,
      password: password
    })
  }).then((r) => r.json()).then((r) => {
    if(r.success){
      //      dispatch({type: types.SET_TOKEN, token: r.token})
      cb()
    }
  })
  }
}
export function login(username, password, cb){
  return (dispatch) => {
  return fetch(`${conf.baseURL}/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then((r) => r.json()).then((r) => {
    if(r.success){
      dispatch({type: types.SET_TOKEN, token: r.token})
      cb()
    }
  })
  }
}
