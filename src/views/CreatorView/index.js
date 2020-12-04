import React from 'react';
import Header from '../../components/header';
import { 
  Divider, 
  Paper,
  List,
  ListItem,
  Typography } from '@material-ui/core';
import {
  MonetizationOn
} from '@material-ui/icons';
import CreatorHeader from '../../components/creator-header';
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
      <div className="creator-inner_view">
        <Paper className="creator-header">
          <CreatorHeader creator={creator} />
          <Divider />      
          <Typography variant="subtitle1">{creator.bio}</Typography>
          <Divider />
          <List style={{flex: 1}}>
            <ListItem button>Market Items</ListItem>
            <ListItem button>Content</ListItem>
            <ListItem button>Projects</ListItem>
          </List>
          <Divider />
          <ListItem button>
            <MonetizationOn style={{marginRight: 12}} />
            Support this creator
          </ListItem>
      </Paper>
      <div className="creator-products">
        {stock.map((x) => (
          <StockCard stock={x} />
        ))}
      </div>
    </div>
  </div>
  );
}
