import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../contexts/AppContexts";
type AuthProps = {
    children:any
}
const Guest = (props:AuthProps) => {
    const { state } = useContext(AppContext);
    return !state.auth.isLoggedIn ? props.children :
        // <Redirect to={ "/" } />
        null
        ;
};

export default Guest;
