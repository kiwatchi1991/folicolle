import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../pages/auth/Login';
import Top from '../pages/Top'

function App() {
  return (
        <Router>
            <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/Login' component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
