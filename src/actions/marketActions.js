import * as types from './types';
const conf = require('../conf')

export function deleteStock(id){
  
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/market/stock/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.DELETE_INVENTORY_ITEM, item: id})
    })
  }
}

export function getInventory(){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/market/stock`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.GET_INVENTORY, inventory: r})
    })
  }
}

export function updateInventory(id, obj, cb){
  return (dispatch, getState) => {
    let fd = new FormData()
    for(var k in obj){
      if(Array.isArray(obj[k])){
        let arr = obj[k]
        for(var i = 0; i < arr.length; i++){
          fd.append(k, arr[i])
        }
      }else{
        fd.append(k, obj[k])
      }
    }
    return fetch(`${conf.baseURL}/market/stock/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + getState().auth.token
      }, 
      body: fd
    }).then((r) => r.json()).then((r) => {
      cb()
      dispatch({type: types.UPDATE_STOCK_ITEM, id: id, obj: obj})
    })
  }
}


export function addToInventory(name, description, images, price, cb){
  return (dispatch, getState) => {
    let fd = new FormData()
    fd.append('name', name)
    fd.append('description', description)
    for(var i = 0 ; i < images.length; i++){
      fd.append('photos', images[i])
    }
    fd.append('price', price)
    return fetch(`${conf.baseURL}/market/stock`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + getState().auth.token
      },
      body: fd
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.ADD_TO_INVENTORY, item: r})
      cb()
    })
  }
}
  
export function getStock(){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/market`).then((r) => r.json()).then((r) => {
      dispatch({type: types.GET_MARKET_FEED, feed: r.stock})
    })
  }
}

export function getCreator(id){
  return fetch(`${conf.baseURL}/market/creator/${id}`).then((r) => r.json())
}
