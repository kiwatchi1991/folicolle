import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Top from "../pages/Top";
import Sample from "../pages/Sample";
import Auth from "./Auth";
import Guest from "./Guest";
import AppContext from "../contexts/AppContexts";
import reducer from "../reducers";
import { AUTHCHECK } from "../actions";

function App() {
    let initialState = {
        auth: { isLoggedIn: null },
    };
    const isLoggedIn = () => {
        return axios
            .get("/sanctum/csrf-cookie")
            .then(() => axios.get("/api/auth"))
            .then((response) => {
                const loggedInUser = response.data.user;
                dispatch({ type: AUTHCHECK, loggedInUser });
            });
    };
    useEffect(() => {
        isLoggedIn();
    }, []);
    const [state, dispatch] = useReducer(reducer, initialState);
    return state.auth.isLoggedIn !== null ? (
        <AppContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Top} />
                    <Guest>
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Register" component={Register} />
                    </Guest>
                    <Auth>
                        <Route exact path="/Sample" component={Sample} />
                    </Auth>
                </Switch>
            </Router>
        </AppContext.Provider>
    ) : (
        ""
    );
}

export default App;
