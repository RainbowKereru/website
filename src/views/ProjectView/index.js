import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
  Tabs,
  Tab,
  TextField,
  Paper,
  Typography,
  Button
} from '@material-ui/core';

import { joinProject, getProject } from '../../actions/projectActions';

import TaskBlock from '../../components/task-block';
import TimelineBlock from '../../components/timeline-block';
import MissionBlock from '../../components/mission-block';
import ResourceBlock from '../../components/resource-block';
import PlanBlock from '../../components/plan-block';
import SettingsBlock from '../../components/settings-block';
import jwt_decode from "jwt-decode";

import YActions from '../../actions/yActions';

import './index.css';

const yActions = YActions();

let yArray;

function ProjectView(props){

  const [ groupDoc, setGroupDoc ] = React.useState(null)

  const [ project, setProject ] = React.useState(props.project || {})

  const projectMenu = [
    {
      label: "Mission",
      path: '/mission'
    },
    {
      label: "Timeline",
      path: "/timeline"
    },
    {
      label: "Tasks",
      path: '/tasks'
    },
    {
      label: "Plan",
      path: '/plan'
    },
    {
      label: "Settings",
      path: "/settings"
    }
  ]

  React.useEffect(() => {
    if(props.match.params.id){
    
      yArray = yActions.getMap(`flow-${props.match.params.id}`)

      setGroupDoc(yArray)
    }

    if(window.projectTimeout) clearTimeout(window.projectTimeout)
    window.projectTimeout = setTimeout(() => {

     if(!props.project || Object.keys(props.project).length == 0){

       props.getProject(props.match.params.id, (project) => {
         console.log(project)
          setProject(project)
        })
      }
    }, 500)
  }, [props.match.params.id])

  React.useEffect(() => {
    setProject(props.project)
  }, [props.project])

  return (
    <div className="project-view">
      <Paper className="project-header">
        <Paper>
          <div className="project-title">
            <Typography variant="h6" style={{marginLeft: 8, textAlign: 'left', padding: 8}}>{project && project.name}</Typography>
              {
                (project && project.owner && project.owner._id != props.user.id) &&
                (project.members||[]).indexOf(props.user.id) < 0 
                  && <Button color="primary" variant="contained" onClick={() => {
                props.joinProject(project._id)
                let p = Object.assign({}, project);
                if(!p.members) p.members = []
                p.members.push(props.user.id)
                setProject(p)
              }}>Join</Button>}
          </div>
          <Tabs
            value={projectMenu.map((x) => x.path).indexOf(props.location.pathname.replace(props.match.url, ''))}>
            {projectMenu.map((x) => {
                if(x.label == "Settings"){
                  if((project && project.owner && project.owner._id != props.user.id) &&
                    (project.members||[]).indexOf(props.user.id) < 0){
                    return null;
                  }
                }
                return <Tab label={x.label} onClick={() => props.history.push(`${props.match.url}${x.path}`)} />
            })}
          </Tabs>
        </Paper>
        <div className="project-body">
          <Switch>

          <Route path={`/dashboard/projects/:id`} exact render={(_props) => {
              return <MissionBlock {..._props} project={props.project || project} />
            }} />
          <Route path={`/dashboard/projects/:id/mission`} render={(_props) => {
              return <MissionBlock {..._props} project={props.project || project} />
          }} />
            <Route path={`/dashboard/projects/:id/timeline`} render={(_props) => {
              return <TimelineBlock {..._props} project={props.project || project} />
            }} />
              
            <Route path={`/dashboard/projects/:id/tasks`} render={(_props) => {
              return <TaskBlock {..._props} y={groupDoc} project={props.project || project} />
            }} />
            <Route path={`/dashboard/projects/:id/resources`} render={(_props) => {
              return <ResourceBlock {..._props} project={props.project || project} />
            }} />
            <Route path={`/dashboard/projects/:id/plan`} render={(_props) => {
              return  <PlanBlock {..._props} project={props.project || project} />
            }} />
            <Route path={`/dashboard/projects/:id/settings`} render={(_props) => {
              return <SettingsBlock {..._props} project={props.project || project} />
            }} />
          </Switch>
    </div>
    </Paper>
    </div>
  );
}

export default connect((state, ownProps) => ({
  user: jwt_decode(state.auth.token),
  project: state.project.list.filter((a) => a._id == ownProps.match.params.id)[0] 
}), (dispatch) => ({
  getProject: (id, cb) => dispatch(getProject(id, cb)),
  joinProject: (id) => dispatch(joinProject(id))
}))(ProjectView)
