import * as types from './types';
const conf = require('../conf')

export function getUserSuggestions(id){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${id}/members/suggestions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.SET_USER_SUGGESTIONS, users: r})
    })
  }
}

export function getInvited(id, cb){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${id}/members`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      cb(r)
      //      dispatch({type: types.SET_PROJECT_INVITES, invites: r})
    })
  }
}

export function getInvites(){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/invites`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.SET_PROJECT_INVITES, invites: r})
    })
  }
}

export function joinProject(project_id){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${project_id}/members/join`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json())
  }
}

export function inviteToProject(project_id, user_id){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${project_id}/members/invite`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      },
      body: JSON.stringify({
        invited: user_id
      })
    }).then((r) => {
      return r.json()
    }).then((r) => {
      console.log(r)
    })
  }
}

export function removeProject(id, cb){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getState().auth.token
    },
  }).then((r) => r.json()).then((r) => {
    if(r.success){
      cb()
    }
 
  })
  }
}


export function addProject(name, brief, _public){
  return (dispatch, getState) => {
  return fetch(`${conf.baseURL}/projects`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getState().auth.token
    },
    body: JSON.stringify({
      name: name,
      description: brief,
      public: _public
    })
  }).then((r) => r.json()).then((r) => {
  
      dispatch({type: types.ADD_PROJECT, project: r})

 
  })
  }
}


export function getPublicProjects(){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/public`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getState().auth.token
    },
  }).then((r) => r.json()).then((r) => {
  
      dispatch({type: types.SET_PUBLIC_PROJECTS, projects: r})

 
  })
  }
}
export function getProjects(){
  return (dispatch, getState) => {
  return fetch(`${conf.baseURL}/projects`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getState().auth.token
    },
  }).then((r) => r.json()).then((r) => {
  
      dispatch({type: types.SET_PROJECTS, projects: r})

 
  })
  }
}

export function getProject(id, cb){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      cb(r)
    })
  }
}

export function updateProject(_id, brief, mission){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/projects`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      },
      body: JSON.stringify({
        _id: _id,
        brief: brief,
        mission: mission
      })
    }).then((r) => r.json()).then((r) => {

    })
  }
}
