import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Top from '../pages/Top'

function App() {
  return (
        <Router>
          <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Register' component={Register} />
            </Switch>
        </Router>
    );
}

export default App;
