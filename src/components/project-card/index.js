import React from 'react';

import { 
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton
} from '@material-ui/core';


import './index.css';

export default function ProjectCard(props){
  return (
    <Card className="project-card" onClick={props.onClick}>
      <CardMedia image={`https://avatars.dicebear.com/api/avataaars/${props.project.name}.svg`} />
      <CardContent style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h6">{props.project.name}</Typography>
        <Typography variant="subtitl1">{(props.project.briefDescription || "").substring(0, 32)}</Typography>
      </CardContent>
    </Card>
  );
}
