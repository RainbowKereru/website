import React from 'react';
import { TiledHexagons } from 'tiled-hexagons';

export default function ActionButton(props){
  return (
    <TiledHexagons
  tileSideLengths={25}
  tileGap={4}
  tileBorderRadii={3}
  maxHorizontal={3}
  tileTextStyles={{
    fontSize: '33px',
    fill: 'gold',
    display: 'flex',
    alignItems: 'center'
  }}
      tiles={[

    { text: 'B',
      textStyle: {
        fill: 'white'
      },
      fill: '#7cebff',
      shadow: '#64c5d6'
    }, 
    { img: '/key.svg', fill: 'gold'},
  ]}
/>
  );
}
