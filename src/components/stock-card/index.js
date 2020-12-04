import React from 'react';

import { 
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import ArtistBubble from '../artist-bubble';

import './index.css';

export default function StockCard(props){
  console.log(props)
  return (
    <Card className="stock-card" onClick={(e) => {
      if(props.onClick) props.onClick()
    }}>
      <CardMedia
        style={{height: 0,
    paddingTop: '56.25%'}}
        image={`https://api.rainbowkereru.com/market/media/${props.stock._id}`} />
      <CardContent className="stock-card__content">
        <div className="stock-card__info">
          <div className="stock-name">
              {props.stock.name}
          </div>
        </div>
        <div className="stock-card__subinfo">
        <ArtistBubble onClick={() => {
          props.onArtistClick(props.stock.owner)
        }}>
          {props.stock.owner.username}
      </ArtistBubble>

          <div className="stock-price">
              ${props.stock.price}
          </div>
    </div>
      </CardContent>
    </Card>
  );
}
