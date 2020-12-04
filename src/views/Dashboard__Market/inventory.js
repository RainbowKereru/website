import React from 'react';

import { Add } from '@material-ui/icons';
import { List, ListItem, Fab } from '@material-ui/core';
import  StockItem from '../../components/stock-item';
import { connect } from 'react-redux';
import './inventory.css';

function Inventory(props){
  const [ inventory ] = React.useState([{img: 'https://placehold.it/500x500', name: "Shoes"}])
  return (
    <div className="inventory-view">

      <List>
        {props.inventory.map((x) => (
          <StockItem item={x} />
        ))}
      </List>
    </div>
  );
}

export default connect((state) => ({
  inventory: state.market.inventory
}))(Inventory)
