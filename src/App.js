import React from 'react';

import { PersistGate } from 'redux-persist/integration/react'

import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './views/Login';
import Dashboard from './views/Dashboard';

import Projects from './views/Projects';
import Market from './views/Market';
import Home from './views/Home';
import Content from './views/Content';
import CreatorView from './views/CreatorView';
import ItemView from './views/ItemView';
import Header from './components/header';
import PublicProject from './views/PublicProject';

import configureStore from './configureStore';
import { Provider } from 'react-redux';

import './App.css';

const { store, persistor } = configureStore()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
    <div className="App">

      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" render={(props) => {
        let path = props.location.pathname;
       if(store.getState().auth.token){
         return (<Dashboard {...props} />)
       }else{
          return (<Redirect to={`/login?redir=${path}`} />)
       }  
      }} />
      <Route path="/projects" component={Projects} exact />
      <Route path="/projects/:id" component={PublicProject} />
      <Route path="/market" exact component={Market} />
      <Route path="/content" component={Content} />
      <Route path="/market/creator/:id" component={CreatorView} />
      <Route path="/market/product/:id" component={ItemView} />
    </div>
  </Router>
</PersistGate>
</Provider>
  );
}

export default App;
