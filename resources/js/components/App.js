import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Top from "../pages/Top";
import Sample from "../pages/Sample";
import Auth from "./Auth";
import AppContext from "../contexts/AppContexts";
import reducer from "../reducers";

function App() {
    const res = () => {
        return axios
            .get("/sanctum/csrf-cookie")
            .then(() => axios.get("/api/auth"))
            .then((response) => response.data.user);
    };

    let initialState = {
        auth: { isLoggedIn: false },
    };

    res().then((data) => {
        if (data) {
            initialState.auth.isLoggedIn = true;
        }
        setState(true);
    });
    const [localState, setState] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Top} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Register" component={Register} />
                    <Auth>
                        <Route exact path="/Sample" component={Sample} />
                    </Auth>
                </Switch>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
