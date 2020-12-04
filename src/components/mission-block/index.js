import React from 'react';

import { 
  TextField,
  Button
} from '@material-ui/core';

import { connect } from 'react-redux';
import { updateProject } from '../../actions/projectActions';

import './index.css';

function MissionBlock(props){
  const [ edited, setEdited ] = React.useState(false)

  const [ projectBrief, setBrief ] = React.useState(props.project ? props.project.briefDescription : '')
  const [ projectMission, setMission ] = React.useState(props.project ? props.project.mission : '')

  const update = () => {
    setEdited(false)
    props.updateProject(props.project._id, projectBrief, projectMission)
  }

  return (
    <div className="mission-block">
      <TextField
        fullWidth
        multiline 
        rows={2} 
        label="Brief" 
        onChange={(e) => {
          setEdited(true)
          setBrief(e.target.value)
        }}
        value={projectBrief}/>
      <TextField 
        fullWidth
        multiline
        rows={6}
        onChange={(e) => {
          setEdited(true)
          setMission(e.target.value)
        }}
        label="Mission Statement" 
        value={projectMission} />
      <div className="mission-actions" >
        <Button color="primary" variant="contained" disabled={!edited} onClick={update}>Save</Button>
      </div>
      <div>
        Team
      </div>
    </div>
)
} 

export default connect(null, (dispatch) => ({
  updateProject: (id, brief, mission) => dispatch(updateProject(id, brief, mission))
}))(MissionBlock)
