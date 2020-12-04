import React from 'react';

import { Button, TextField } from '@material-ui/core';
import './index.css';
export default function LoginBox(props){
  return (
    <div className="login-box">
      <TextField label="Username" fullWidth/>
      <TextField label="Password" type="password" fullWidth/>
      <div className="login-actions">
        <Button color="primary" variant="contained">Login</Button>
      </div>
    </div>
  );
} 
