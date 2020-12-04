import React from 'react';
import ActionButton from './action-button';
import { Hexagon } from 'tiled-hexagons';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import './index.css';

function Header(props){

   const [ menu, setMenu ] = React.useState([
    {
      name: "Projects",
      path: "/projects"
    },
     {
      name: "Market",
       path: "/market"
     },
     {
      name: "Content",
       path: "/content"
     }
  ])

  return (

    <div className="header">
      <div className="title">
        <div className="title-logo">
          <Hexagon
            onClick={() => props.history.push('/')}
            img="/logo.png" />

          <h2>Rainbow Kereru</h2>
        </div>
        <div           
          className='title-actions'
          style={{

            height: 70,
            alignItems: 'center',
            display: 'flex',
            position: 'relative'}}>
        <ul>
            {menu.map((x) => (
              <li 
                className={props.match.url.indexOf(x.path) > -1 && 'selected-route'} 
                onClick={() => props.history.push(x.path)}>{x.name}</li>
            ))}
            </ul>

            <Hexagon
              img={'/key.svg'}
              fill={'gold'}
              href={"/login"} 
              target={"_parent"}/>
          </div>
        </div>
      </div>
  );
}

export default withRouter(Header)
