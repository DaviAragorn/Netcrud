import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from '../src/Users';
import Logs from '../src/Logs';

const Routes = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Users}></Route>
      <Route exact path='/logs' component={Logs}></Route>
    </Switch>
  );
}

export default Routes;