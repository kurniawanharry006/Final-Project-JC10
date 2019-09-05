import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {withRouter, Route, Switch} from 'react-router-dom'
import NavbarComp from './1.Page/Navbar/Navbar'
import Login from './1.Page/SignIn/Login'
import 'mdbootstrap/css/mdb.min.css'
import Register from './1.Page/SignIn/Register'
import Home from './1.Page/Home/Home'

function App() {
  return (
    <div >
      <NavbarComp/>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Login} path='/login' exact />
        <Route component={Register} path='/register' exact />
      </Switch>
    </div>
  );
}

export default withRouter (App);

