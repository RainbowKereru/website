import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button
} from '@material-ui/core';

import { connect } from 'react-redux';
import { addProject } from '../../actions/projectActions';

function ProjectModal(props){
  const [ name, setName ] = React.useState('')
  const [ description, setDescription ] = React.useState('')
  const [ _public, setPublic ] = React.useState(false)

  const onClose = () => {
    setName('')
    setDescription('')
    props.onClose()
  }

  const _addProject = () => {
    props.addProject(name, description, _public)
    onClose()
  }

  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <TextField 
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth 
          label="Project Name" />
        <TextField
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth 
          label="Brief description" />
        <FormGroup row style={{display: 'flex', justifyContent: 'flex-end'}}>
          <FormControlLabel
            control={<Switch checked={_public} onChange={(e) => setPublic(e.target.checked)} />}
              label="Public" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={_addProject}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, (dispatch) => ({
  addProject: (name, brief, p) => dispatch(addProject(name, brief, p))
}))(ProjectModal)
