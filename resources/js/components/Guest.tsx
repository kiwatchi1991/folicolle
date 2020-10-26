import { jsx } from "@emotion/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../contexts/AppContexts";
jsx;
type AuthProps = {
    children:any
}
const Guest = (props:AuthProps) => {
    const { state } = useContext(AppContext);
    console.log("Guestコンポーネント");
    return !state.auth.isLoggedIn ? (
        props.children
    ) : (
        <Redirect to={"/"} />
     );
};

export default Guest;
