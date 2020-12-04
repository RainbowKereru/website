import React from 'react';

import './index.css';

export default function ArtistBubble(props){
  return (
        <div className="artist-bubble" onClick={(e) => {
          e.stopPropagation()
          props.onClick();

        }}>
            {props.children}
      </div>
  )
}
