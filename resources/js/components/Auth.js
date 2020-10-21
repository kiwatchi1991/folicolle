import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
    const isLoggedIn = async () => {
        const res = await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .get("/api/auth")
                .then((res) => {
                    console.log("then", res);
                })
                .catch((res) => {});
            return res;
        });
    };
    useEffect(() => {
        isLoggedIn();
    }, []);
    return isLoggedIn() ? props.children : <Redirect to={"/"} />;
};

export default Auth;
