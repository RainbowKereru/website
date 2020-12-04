import React from 'react';

import {
  AllInbox,
  ChevronLeft,
  Menu as MenuIcon,
  AccountCircle } from '@material-ui/icons';

import { 
  Divider,
  AppBar, 
  Drawer,
  Menu,
  List,
  Badge,
  ListItem,
  Toolbar, 
  Typography, 
  IconButton } from '@material-ui/core';

import { Switch, Route } from 'react-router-dom';

import ProjectView from '../ProjectView';
import DashboardProjects from '../Dashboard__Project';
import DashboardMarket from '../Dashboard__Market';
import DashboardHome from '../Dashboard__Home';
import DashboardCalendar from '../Dashboard__Calendar';

import { connect } from 'react-redux';
import { getInvites } from '../../actions/projectActions';
import './index.css';

function Dashboard(props){
  const [ closeProfile, closeProfiles ] = React.useState(true)
  const [ closeInvite, closeInvites ] = React.useState(true)
  const [ drawerOpen, openDrawer ] = React.useState(false)

  const [ profileEl, setProfileEl ] = React.useState(null)
  const [ inboxEl, setInboxEl ] = React.useState(null)

  const menu = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Market",
      path: "/market"
    },
    {
      label: "Calendar",
      path: "/calendar"
    },
    {
      label: "Resources",
      path: "/resources"
    },
    {
      label: "Pods",
      path: "/pods"
    }
  ]

  React.useEffect(() => {
    props.getInvites();
  }, [])

  return (
    <div className="dashboard">
      <AppBar position="static">
        <Toolbar>
          <div className="dashboard-header">
            <IconButton color="inherit" onClick={() => openDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6"> 
              Rainbow Actions
            </Typography>
            <IconButton color="inherit" ref={(r) => setInboxEl(r)} onClick={() => closeInvites(false)}>
              <Badge badgeContent={props.invites.length} color="secondary">
                <AllInbox />
              </Badge>
            </IconButton>

            <Menu open={!closeInvite} anchorEl={inboxEl} style={{marginTop: 30}} onClose={() => closeInvites(true)}>
                <List>
                    {props.invites.length > 0 ? props.invites.map((x) => (
                    <ListItem 
                      button 
                      onClick={() => props.history.push(`/dashboard/projects/${x.project._id}`)}
                      style={{
                        flexDirection: 'column', 
                        display: 'flex', 
                        alignItems: 'flex-start'}}>
                      <div>
                          {x.message} 
                      </div>
                      <div>
                        <Typography variant="subtitle1" style={{fontWeight:'bold'}}>@{x.inviter.username} - {x.project.name}</Typography>
                      </div>
                    </ListItem>
                    )) : <ListItem>No invites</ListItem>}
                </List>
              </Menu>
              <IconButton color="inherit" ref={(r) => setProfileEl(r)} onClick={() => closeProfiles(false)}>
              <AccountCircle />
            </IconButton>
            <Menu open={!closeProfile} anchorEl={profileEl} style={{marginTop: 30}} onClose={() => closeProfiles(true)}>
              <List>
                <ListItem>Profile</ListItem>
              </List>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => openDrawer(false)}>
        <ListItem onClick={() => props.history.push('/dashboard')} button className="drawer-header">
          <img src="/logo.png" />
          <Typography variant="h6">Rainbow Kereru</Typography>
        </ListItem>
        <Divider />
        <List style={{flex: 1}}>
            {menu.map((x) => (
              <ListItem button onClick={() => {
                props.history.push(`${props.match.url}${x.path}`)
                openDrawer(false)
              }}>{x.label}</ListItem>
            ))}
          </List>
        <Divider />
        <ListItem button onClick={() => props.history.push('/')}>
          <ChevronLeft />
          Exit to website
        </ListItem>
      </Drawer>

      <div className="dashboard-body">
        <Switch>
          <Route 
            exact
            path={`${props.match.url}`}
            component={DashboardHome} />
          <Route 
            path={`${props.match.url}/projects/:id`}
            component={ProjectView} />
          <Route
            path={`${props.match.url}/market`}
            component={DashboardMarket} />
          <Route 
            exact
            path={`${props.match.url}/projects`} 
            component={DashboardProjects} />
          <Route
            exact
            path={`${props.match.url}/calendar`}
            component={DashboardCalendar} />
        </Switch>
      </div>
    </div>
  );
}

export default connect((state) => ({
  invites: state.project.invites || []
}), (dispatch) => ({
  getInvites: () => dispatch(getInvites())
}))(Dashboard)
