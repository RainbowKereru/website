import React from 'react';

import { Delete } from '@material-ui/icons';

import {
  IconButton,
  ListItem,
  Typography
} from "@material-ui/core"
import { connect } from 'react-redux';
import { deleteStock } from '../../actions/marketActions';

import './index.css';

const StockItem = (props) =>{
  return (
    <ListItem button className="stock-item">
      <img src={`https://api.rainbowkereru.com/market/media/${props.item._id}`} />
      <Typography variant="h6" style={{flex: 1}}>
          {props.item.name}
      </Typography>
      <IconButton onClick={() => {
        props.deleteStock(props.item._id)
      }}>
        <Delete />
      </IconButton>
    </ListItem>
  );    
}

export default connect(null, (dispatch) => ({
  deleteStock: (id) => dispatch(deleteStock(id))
}))(StockItem)
