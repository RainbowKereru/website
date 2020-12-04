import React from 'react';

import {
  ExpandMore
} from '@material-ui/icons';

import { 
  Typography,
  Button
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LoginBox from '../../components/login-box';
import './index.css';

 function TitleBanner(props){
   return (
     <div className="title-banner">

       <div className="title-video">
         <Typography 
           style={{marginBottom: 12}} 
           variant="h4">Latest Video</Typography>
         <video 
           controls 
           src="/consenttalk.mp4" />
         <Button 
           style={{marginTop: 12}} 
           variant="outlined" 
           size="large" 
           color="primary"
          onClick={() => props.history.push('/content')} >See More</Button>
       </div>

       <div className="title-more">
          <ExpandMore /> 
       </div>
    </div>
  );
 }

export default withRouter(TitleBanner)
