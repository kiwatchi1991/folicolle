import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../contexts/AppContexts";

const Auth = (props) => {
    const { state } = useContext(AppContext);
    return state.auth.isLoggedIn ? props.children : <Redirect to={"/"} />;
};

export default Auth;
