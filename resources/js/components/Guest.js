import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../contexts/AppContexts";

const Guest = (props) => {
    const { state } = useContext(AppContext);
    return !state.auth.isLoggedIn ? props.children : <Redirect to={"/"} />;
};

export default Guest;
