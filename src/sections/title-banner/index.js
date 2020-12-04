import React from 'react';

import { withRouter } from 'react-router-dom';
import LoginBox from '../../components/login-box';
import './index.css';

 function TitleBanner(props){
   return (
     <div className="title-banner">
     <div className="title-video">
        <video controls src="/consenttalk.mp4" />
      </div>
    </div>
  );
 }

export default withRouter(TitleBanner)
