import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Index from "./Index";

const App = () => {
    return (
        <Switch>
            <Route exact path="/products" component={Index} />
        </Switch>
    );
};

export default App;
