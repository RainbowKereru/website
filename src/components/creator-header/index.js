import React from 'react';
import Hexagon from 'react-hexagon';
import {
  Typography,
  Badge
} from '@material-ui/core';
import {
  Category,
  Pages,
  Eco
} from '@material-ui/icons';

import './index.css';

const CreatorDetails = (props) => {
  return (
    <div className="creator-details-view">
      <Badge color="primary" badgeContent={4}>
        <Category />
      </Badge>
      <Badge color="primary" badgeContent={4}>
        <Pages />
      </Badge>
      <Badge color="primary" badgeContent={4}>
        <Eco />
      </Badge>
    </div>
  );
}

export default function CreatorHeader(props){
  return (
    <div className="creator-information">
      <div className="creator-image">
        <Hexagon
          style={{stroke: '#42873f'}}
          backgroundImage={`https://avatars.dicebear.com/api/avataaars/${props.creator.username}.svg`} />
      </div>
      <div className="creator-details">
        <Typography style={{flex: 1}} variant="h6">{props.creator.username}</Typography>
        <CreatorDetails />
      </div>
    </div>
  );
}
