import * as types from '../actions/types';

const INIT = {
  feed: [],
  inventory: []
}

export default function marketReducer(state = INIT, action = {}){
  switch(action.type){
    case types.DELETE_INVENTORY_ITEM:
      let n = state.inventory.slice()
      let nIx = n.map((x) => x._id).indexOf(action.item)
      n.splice(nIx, 1)
      return {
        ...state,
        inventory: n
      }
    case types.ADD_TO_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.concat([action.item])
      }
    case types.GET_MARKET_FEED:
      return {
        ...state,
        feed: action.feed
      }
    case types.GET_INVENTORY:
      return {
        ...state,
        inventory: action.inventory
      }
    default:
      return state;
  }
}
