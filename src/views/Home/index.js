import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { getStock } from '../../actions/marketActions';
import { Link } from 'react-router-dom'
import Projects from '../../sections/projects'; 
import Content from '../../sections/content';
import Header from '../../components/header';
import StockCard from '../../components/stock-card';
import TitleBanner from '../../sections/title-banner';
import { connect } from 'react-redux';

import './index.css';

function Home(props){

const [ stock, setStock ] = React.useState([])
const [ users, setUsers ] = React.useState([])

React.useEffect(() => {
  props.getStock()
}, [])


  return (
    <div className="home-view">
      <Header />
      <TitleBanner />
      <Divider />
      <div className="content-row">
        <Typography variant="h4">Market</Typography>
        <Typography variant="subtitle1">New</Typography>
          
        <div className="content-scroll">
        {props.stock.map((x) => (
          <StockCard stock={x} onArtistClick={(artist) => {
            props.history.push('/creator/' + artist._id)
          }}/>
        ))}
        </div>
        <Link to="/market" className="content-actions">
          View all
        </Link>
      </div>
      <Divider />
      <Content />
      <Divider />
      <Projects />
    </div>
  );
}

export default connect((state) => ({
  stock: state.market.feed
}), (dispatch) => ({
  getStock: () => dispatch(getStock())
}))(Home)
