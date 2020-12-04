import React from 'react';
import Header from '../../components/header';
import StockCard from '../../components/stock-card';

import { getStock } from '../../actions/marketActions';
import { connect } from 'react-redux';

import './index.css';

function Market(props){
  React.useEffect(() => {
    props.getStock()
  }, [])

  return (
    <div className="market">
      <Header />     
      <div className="market-view">
        {props.stock.map((x) => (
          <StockCard 
            onClick={() => {
              props.history.push(`/market/product/${x._id}`)
            }}
            onArtistClick={() => {
              props.history.push(`/market/creator/${x.owner._id}`)
            }}
            stock={x} />
        ))}
      </div>
    </div>
  );
}

export default connect((state) => ({
  stock: state.market.feed || []
}), (dispatch) => ({
  getStock: () => dispatch(getStock())
}))(Market)
