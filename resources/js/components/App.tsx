import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Top from "../pages/Top";
import Products from "../pages/Products/App";
import Sample from "../pages/Sample";
import Auth from "./Auth";
import Guest from "./Guest";
import AppContext from "../contexts/AppContexts";
import reducer from "../reducers";

const App = () => {
    const initialState: {
        auth: { isLoggedIn: boolean | null };
    } = {
        auth: { isLoggedIn: null },
    };
    const [state, dispatch] = useReducer<any>(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Top} />
                    <Route exact path="/products" component={Products} />
                    <Guest>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Guest>
                    <Auth>
                        <Route exact path="/Sample" component={Sample} />
                    </Auth>
                </Switch>
            </Router>
        </AppContext.Provider>
    );
};

export default App;
