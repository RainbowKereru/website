import React from 'react';

import { Add } from '@material-ui/icons';
import { Typography, Fab } from '@material-ui/core';
import ProjectCard from '../../components/project-card';
import ProjectModal from '../../components/project-modal';

import { connect } from 'react-redux';
import { getProjects } from '../../actions/projectActions';

import './index.css';

function DashboardProjects(props){
  const [ modalOpen, openModal ] = React.useState(false)
  const [ projects, setProjects ] = React.useState([
    {
      name: "Fuck Fast Fashion"
    }
  ])

  React.useEffect(() => {
    props.getProjects();
  }, [])

  return (
    <div className="dashboard-projects">
      <ProjectModal open={modalOpen} onClose={() => openModal(false)}/>
      <Typography variant="h6">Projects</Typography>
      <div className="project-grid">
        {props.projects.map((x) => (
          <ProjectCard project={x} onClick={() => {
            props.history.push(`${props.match.url}/${x._id}`)
          }}/>
        ))}

        </div>
        <Fab 
          onClick={() => openModal(true)}
          color="primary" 
          style={{position: 'absolute', right: 12, bottom: 12}}>
        <Add />
      </Fab>
    </div>
  );
}

export default connect((state) => ({
  projects: state.project.list
}), (dispatch) => ({
  getProjects: () => dispatch(getProjects())
}))(DashboardProjects)
