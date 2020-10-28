import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { jsx } from "@emotion/core";
import AppContext from "../contexts/AppContexts";
import { AUTHCHECK } from "../actions";

jsx;

type AuthProps = {
    children: any;
};
const Auth = (props: AuthProps) => {
    const { state, dispatch } = useContext(AppContext);
    const isLoggedIn = async () => {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/auth");
        const loggedInUser = response.data.user;
        dispatch({ type: AUTHCHECK, loggedInUser });
    };
    useEffect(() => {
        isLoggedIn();
    }, []);

    return state.auth.isLoggedIn ? props.children : <Redirect to="/" />;
};

export default Auth;
