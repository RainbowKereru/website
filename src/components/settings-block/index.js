import React from 'react';

import { 
  Autocomplete 
} from '@material-ui/lab';

import {
  TextField,
  Typography,
  Card,
  List,
  Button,
  ListItem,
  Fab
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {  Schedule, Security, Add } from '@material-ui/icons';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { removeProject, inviteToProject, getUserSuggestions, getInvited } from '../../actions/projectActions';
import './index.css';

function SettingsBlock(props){
  const [ inviteUser, setInviteUser ] = React.useState(null)
  const [ usersSuggestions, setUserSuggestions ] = React.useState([
  ])

  const [team, setTeam ] = React.useState([
  ])

  React.useEffect(()=> {
    props.getInvited(props.match.params.id, (teams) => {
      setTeam(teams.members)
    })

  }, [props.match.params.id])

  React.useEffect(() => {
    props.getUserSuggestions(props.match.params.id)
  }, [])
  console.log(props)
  return (
    <div className="settings-block">
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', marginRight: 4}}>
        <Card style={{flex: 1}}>

        </Card>
        {props.project.owner._id == props.user.id && (<Card style={{marginTop: 8}}>
          <Button color="secondary" onClick={() => {
            props.removeProject(props.match.params.id, () => {
              props.history.push('/dashboard/projects')
            })
          }}>Delete Project</Button>
        </Card>)}
      </div>
      <Card style={{width: '27vw', display: 'flex', position: 'relative', height: '100%', flexDirection: 'column'}}>
      <Typography style={{textAlign: 'left', padding: 8}} variant="h6">Team</Typography>

      <div className="settings-block__user-list">
      <Autocomplete
        value={inviteUser}
        onChange={(e, newVal) => setInviteUser(newVal)}
        options={props.users}
        getOptionLabel={option => option.username}
        style={{width: 300}}
        renderInput={(params) => <TextField fullWidth {...params} label="Username" />} />
      <Button size="small" style={{height: 35}} disabled={inviteUser == null} onClick={() => {

        props.inviteToProject(props.match.params.id, inviteUser.id)
      }}
        color="primary" variant="contained">
        Invite
      </Button>
      </div>
      <List style={{flex: 1}}>
        {team.map((x) => (
          <ListItem button>{x.status == "pending" ? (
            <Schedule style={{marginRight: 8}}/>
          ): (
          
            <Security style={{marginRight: 8}}/>
            
          )
          } {x.name}</ListItem>
        ))}
        </List>
    </Card>
    </div>
  );
}

export default connect((state, ownProps) => ({
  project: state.project.list.filter((a) => a._id == ownProps.match.params.id)[0],      
  invited: state.project.invited,
  user: jwt_decode(state.auth.token),
  users: state.project.users || []
}), (dispatch) => ({
  getInvited: (id, cb) => dispatch(getInvited(id, cb)),
  getUserSuggestions: (id) => dispatch(getUserSuggestions(id)),
  inviteToProject: (project, user) => dispatch(inviteToProject(project, user)),
  removeProject: (id, cb) => dispatch(removeProject(id, cb))
}))(withRouter(SettingsBlock))
