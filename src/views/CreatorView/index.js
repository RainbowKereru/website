import React from 'react';
import Header from '../../components/header';
import { Divider, Typography } from '@material-ui/core';
import Hexagon from 'react-hexagon';
import StockCard from '../../components/stock-card';
import { getCreator } from '../../actions/marketActions';
import './index.css';
export default function CreatorView(props){
  const [ creator, setCreator ] = React.useState({})

  const [ stock, setStock ] = React.useState([])

  React.useEffect(() => {
    getCreator(props.match.params.id).then((creator) => {
      setCreator(creator.creator)
      setStock(creator.items)
      console.log(creator)
    })
  }, [])

  return(
    <div className="creator-view">
      <Header />
      <div className="creator-header">
        <div className="creator-info">
          <Hexagon
            style={{stroke: '#42873f'}}
            backgroundImage={`https://avatars.dicebear.com/api/avataaars/${creator.username}.svg`} />
        </div>
        <div className="creator-stats">
          <Typography variant="h5">{creator.name}</Typography>
          <div className="stat-blocks">
            <p>
                16 items
            </p>
            <p>
                130 posts
            </p>
            <p>
                8 community projects
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="creator-products">
        {stock.map((x) => (
          <StockCard stock={x} />
        ))}
      </div>
    </div>
  );
}
