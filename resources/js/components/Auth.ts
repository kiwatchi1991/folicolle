import React, { useContext, useEffect } from "react";
import { Router, Redirect, RedirectProps} from "react-router-dom";
import AppContext from "../contexts/AppContexts";
import axios from 'axios';
import { AUTHCHECK } from "../actions";

type AuthProps = {
    children:any
}
const Auth = (props: AuthProps) => {
    const { state, dispatch } = useContext(AppContext);
    const isLoggedIn = async () => {
        await axios
            .get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/auth");
        const loggedInUser = response.data.user;
        dispatch({ type: AUTHCHECK, loggedInUser });
    };
    useEffect(() => {
        isLoggedIn();
    }, []);
    return state.auth.isLoggedIn ? (
         props.children
        ) : (
            // <Redirect to={"/"} />
            null
    );
};

export default Auth;
