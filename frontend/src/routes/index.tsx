import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Chat from '../pages/Dashboard';
import Admin from '../pages/Admin';
import SignIn from '../pages/SingIn';
import SignInAdmin from '../pages/SingInAdmin';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/chat" component={Chat} />
    <Route path="/admin" component={SignInAdmin} />
    <Route path="/main" component={Admin} />
  </Switch>
);

export default Routes;
