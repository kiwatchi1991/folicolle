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
import { LOAD } from "../actions";

function App() {
    let initialState = {
        firstLoad: true,
        auth: { isLoggedIn: false },
    };
    const res = () => {
        return axios
            .get("/sanctum/csrf-cookie")
            .then(() => axios.get("/api/auth"))
            .then((response) => {
                console.log("Appコンポーネントのresponse");
                console.log(response);
                response.data && dispatch({ type: AUTHCHECK });
                dispatch({ type: LOAD });
            });
    };
    useEffect(() => {
        res();
        console.log("state", state);
    }, [state]);
    const [localState, setState] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    return !state.firstLoad ? (
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
