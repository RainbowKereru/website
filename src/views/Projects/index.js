import React from 'react';
import Header from '../../components/header';
import ProjectCard from '../../components/project-card';
import { connect } from 'react-redux';
import { getPublicProjects } from '../../actions/projectActions';
import './index.css';

function Projects(props){
  React.useEffect(() => {
    props.getPublicProjects();
  }, [])
  return (
    <div className="projects">
      <Header />
      <div className="project-list">
        {props.public.map((x) => (
          <ProjectCard project={x} onClick={() => props.history.push(`/projects/${x._id}`)} />
        ))}
      </div>
    </div>
  );
}

export default connect((state) => ({
  public: state.project.public
}), (dispatch) => ({
  getPublicProjects: () => dispatch(getPublicProjects())
}))(Projects)
