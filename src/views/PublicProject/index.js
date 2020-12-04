import React from 'react';
import Header from '../../components/header';
import HiveEditor from 'react-hive-flow';
import { ArrowBack } from '@material-ui/icons';
import {
  Typography,
  IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import './index.css';
function PublicProject(props){
  return (
    <div className="public-project">
      <Header />
      <div className="public-project__header">
        <IconButton onClick={() => props.history.push('/projects')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{props.project.name}</Typography>
      </div>
      <div className="public-flow">
        {props.project && props.project.flow && <HiveEditor 
        nodes={props.project.flow.nodes || []}
          links={props.project.flow.links || []} />}
      </div>
    </div>
  );
}

export default connect((state, ownProps) => ({
  project: state.project.public.filter((a) => a._id == ownProps.match.params.id)[0]
}))(PublicProject)
