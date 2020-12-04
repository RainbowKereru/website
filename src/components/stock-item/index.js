import React from 'react';

import { Create, MoreVert, Delete } from '@material-ui/icons';

import {
  IconButton,
  ListItem,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core"
import { connect } from 'react-redux';
import { deleteStock } from '../../actions/marketActions';

import './index.css';

const StockItem = (props) =>{
  const [ anchor, setAnchor ] = React.useState(null)

  const editItem = () => {
    props.editItem(props.item._id)
  }

  const deleteItem = () => {
    props.deleteStock(props.item._id)
  }


  const stockMenu = [
    {
      label: "Edit",
      icon: <Create />,
      action: editItem
    },
    {
      label: "Delete",
      color: 'red',
      icon: <Delete />,
      action: deleteItem
    }
  ]

  return (
    <ListItem className="stock-item">
      <img src={`https://api.rainbowkereru.com/market/media/${props.item.photos[0]}`} />
      <Typography variant="h6" style={{flex: 1}}>
          {props.item.name}
      </Typography>
      <IconButton onClick={(e) => {
        e.stopPropagation()
        //        props.getOptions(props.item._id)
        setAnchor(e.currentTarget)
      }}>
        <MoreVert />
      </IconButton>
      <Menu onClose={() => setAnchor(null)} open={anchor != null} anchorEl={anchor}>
        {stockMenu.map((x) => (
          <MenuItem 
            style={{color: x.color || 'black'}}
            onClick={x.action}>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 8}}>{x.icon}</div> 
          <Typography>{x.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  );    
}

export default connect(null, (dispatch) => ({
  deleteStock: (id) => dispatch(deleteStock(id))
}))(StockItem)
