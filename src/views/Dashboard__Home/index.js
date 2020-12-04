import React from 'react';

import { Paper, ListItem, List, Divider, Typography } from '@material-ui/core';
import { getPublicProjects } from '../../actions/projectActions';
import { connect } from 'react-redux';

import './index.css'

function DashboardHome(props){

  React.useEffect(() => {
    props.getPublicProjects()
  }, [])
  console.log(props)
  return (
    <div className="dashboard-home">
      <div className="main-col">
          <Paper style={{flex: 0.7}}>
            <Typography variant="h6">Flow</Typography>
            <Divider />
          </Paper>
          <Paper style={{flex: 0.3}}>

          </Paper>
      </div>
      <div className="feed-col">
      <Paper style={{flex: 1}}>
        <Typography variant="subtitle1">Latest Public Projects</Typography>
        <Divider />
        <List>
            {props.projects && props.projects.map((x) => (
              <ListItem onClick={() => props.history.push(`/dashboard/projects/${x._id}`)} button>{x.name}</ListItem>
            ))} 
        </List>
      </Paper>
    </div>
    </div>
  );
}

export default connect((state) => ({
  projects: state.project.public || []
}), (dispatch) => ({
  getPublicProjects: () => dispatch(getPublicProjects())
}))(DashboardHome)
