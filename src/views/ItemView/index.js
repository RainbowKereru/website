import React from 'react';
import Header from '../../components/header';
import ArtistBubble from '../../components/artist-bubble';
import {
  Typography,
  Button,
  Card
} from '@material-ui/core';

import { connect } from 'react-redux';

import './index.css';

function ItemView(props){
  return(
    <div className="item-view">
      <Header />      
      <div className="media-view">
        <div className="item-image">
          <img style={{backgroundImage: `url(https://api.rainbowkereru.com/market/media/${props.item._id})`}} />
        </div>
        <div className="item-description">
        <Card>   
        <div className="item-header">
          <Typography style={{borderBottom: '2px solid purple'}} variant="h4">
              {props.item.name}
          </Typography>
          <ArtistBubble onClick={() => {
            props.history.push(`/market/creator/${props.item.owner._id}`)
          }}>
            {props.item.owner.username}
          </ArtistBubble>
          </div>
          <div className="item-body">
          <Typography variant="body">
              {props.item.description}
          </Typography>
        </div>

        <div className="item-actions">
          <Typography variant="h6">${props.item.price}</Typography>
              <Button color="primary" variant="contained">Add to Cart</Button>
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
}

export default connect((state, ownProps) => ({
  item: state.market.feed.filter((a) => a._id == ownProps.match.params.id)[0]
}))(ItemView)
