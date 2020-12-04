import React from 'react';
import { 
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { login, signup } from '../../actions/authActions';
import { connect } from 'react-redux';
import './index.css';

function Login(props){
  const [ name, setName ] = React.useState('')
  
  const [ error, setError ] = React.useState(null)

  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const [ signup, setSignup ] = React.useState(false);

  const _login = () => {
    if(signup){
      props.signup(name, username, password, () => {
        setSignup(false)
      })  
    }else{
      props.login(username, password, (err) => {
        if(!err){
          setError(null)
          let urlParams = new URLSearchParams(window.location.search)
          if(urlParams.get('redir')){
            props.history.push(urlParams.get('redir'))
          }else{
            props.history.push('/dashboard')
          }
        }else{
          setError(err)
        }
    })
    }
  }

  return (
    <div className="login-container">
        <Card className="login-form">
          <CardContent style={{display: 'flex', flexDirection: 'column'}}>
            <div className="login-header">
              <img src="/logo.png" />
              <Typography variant="h5">Rainbow Kereru</Typography>
            </div>
    {signup &&            <TextField
              label="Real Name"
              value={name}
              onChange={(e) => setName(e.target.value)} />}
            <TextField 
              error={error}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username" />
            <TextField
              error={error}
              type="password"
              onKeyDown={(e) => {
                if(e.keyCode == 13) _login();
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password" />
          </CardContent>
        <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button 
            onClick={_login}
            color="primary" variant="contained">{signup ? "Signup" : "Login"}</Button>
        </CardActions>
      </Card>
      <div onClick={() => setSignup(!signup)} style={{marginTop: 8}} className="signup-switch">{signup ? "Already have an Account? Log in":  "No Account? Sign up"}</div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  signup: (n, u, p, c) => dispatch(signup(n, u, p, c)),
  login: (u, p, c) => dispatch(login(u,p, c))
}))(Login)
