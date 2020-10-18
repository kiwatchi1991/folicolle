import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AUTHCHECK } from "../actions";
import AppContext from "../contexts/AppContexts";

const Guest = (props) => {
    const res = () => {
        return axios
            .get("/sanctum/csrf-cookie")
            .then(() => axios.get("/api/auth"))
            .then((response) => {
                response.data.user && dispatch({ type: AUTHCHECK });
            });
    };
    // res().then((data) => {
    //     if (data) {
    //         dispatch({ type: AUTH });
    //     }
    // });
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        res();
    }, []);
    return !state.auth.isLoggedIn ? props.children : <Redirect to={"/"} />;
};

export default Guest;
