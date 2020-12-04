import React from 'react';

import { Add } from '@material-ui/icons';

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

import { connect } from 'react-redux';
import { getInventory } from '../../actions/marketActions';

import './index.css';

function MarketDashboard(props){
  const menu = [
    {
      label: "Stall",
      path: "/stall"
    },
    {
      label: "Inventory",
      path: "/inventory"
    }
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

          <Fab onClick={() => openModal(true)} color="primary" style={{position: 'absolute', right: 12, bottom: 12, zIndex: 9}}>
          <Add />
        </Fab>
          <Switch>
            <Route path={`${props.match.url}/stall`} component={Stall} />
            <Route path={`${props.match.url}/inventory`} component={Inventory} />
          </Switch>
        </div>
      </Paper>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  getInventory: () => dispatch(getInventory())
}))(MarketDashboard)
