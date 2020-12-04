import React from 'react';

import { Add, MoreVert } from '@material-ui/icons';

import {
  Fab,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core';

import { Switch, Route } from 'react-router-dom';
import StockModal from '../../components/stock-modal';
import Stall from './stall';
import Inventory from './inventory'; 
import MarketItem from './item';

import { connect } from 'react-redux';
import { getInventory } from '../../actions/marketActions';

import './index.css';

function MarketDashboard(props){
  const menu = [
    {
      label: "Stall",
      path: "/stall"
    },
  ]
  const [ modalOpen, openModal ] = React.useState(false)


  React.useEffect(() => {
    props.getInventory()
  }, [])

  return (
    <div className="market-dashboard">
      <StockModal open={modalOpen} onClose={() => openModal(false)} />
      <Paper>
        <Paper style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography style={{marginLeft: 12, marginTop: 8}} variant="h6">Market</Typography>
          <Tabs
            value={menu.map((x) => x.path).indexOf(props.location.pathname.split(props.match.url)[1])}
            >
            {menu.map((x) => (
              <Tab onClick={() => props.history.push(`${props.match.url}${x.path}`)} label={x.label} />
            ))}
          </Tabs>
        </Paper>
        <div className="market-dashboard__body">

        <Switch>
            <Route path={`${props.match.url}/item`} exact component={MarketItem} />
            <Route path={`${props.match.url}/item/:id`} component={MarketItem} />
            <Route path={`${props.match.url}/stall`} component={Inventory} />
          </Switch>
        </div>
      </Paper>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  getInventory: () => dispatch(getInventory())
}))(MarketDashboard)
