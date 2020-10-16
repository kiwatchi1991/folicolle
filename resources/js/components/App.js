import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Top from "../pages/Top";
import Sample from "../pages/Sample";
import Auth from "./Auth";
import AppContext from "../contexts/AppContexts";
import reducer from "../reducers";

function App() {
    // const getLoggedInUser = () => {

    const res = async () => {
        await axios.get("/sanctum/csrf-cookie").then(() => {
            axios.get("/api/auth").then((response) => {
                console.log("then", response.data.user);
                const auth = response.data.user;
                return auth;
            });
            // .catch((response) => {});
            // console.log("getLoggedInUser内のisLogin ".isLoggedIn);
        });
        // return res;
    };
    useEffect(() => {
        res();
        console.log(res());
    }, []);
    const initialState = res()
        ? {
              auth: { isLoggedIn: true },
          }
        : {
              auth: { isLoggedIn: false },
          };

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(initialState);
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
