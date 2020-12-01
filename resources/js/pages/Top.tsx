import React, { useContext, useEffect } from "react";
import axios from "axios";

import Layout from "../components/Layout/Layout";
import AppContext from "../contexts/AppContexts";
import { LOGOUT, AUTHCHECK } from "../actions";

import { Link } from "react-router-dom";
const styles = require("./Top.modules.scss");

type defaultPropsType = any;
const Top = (props: defaultPropsType) => {
    // style
    const { state, dispatch } = useContext(AppContext);

    const isLoggedIn = async () => {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/auth");
        console.log("TOP画面のdispatch前");
        const loggedInUser = response.data.user;
        dispatch({ type: AUTHCHECK, loggedInUser });
        console.log("TOP画面のdispatch後のstate", state.auth.isLoggedIn);
    };
    useEffect(() => {
        isLoggedIn();
    }, []);
    const logout = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/logout")
                .then((response) => {
                    console.log("response", response);
                    console.log("props", props);
                    dispatch({ type: LOGOUT });
                    // eslint-disable-next-line react/prop-types
                    props.history.push("/");
                })
                .catch((error: any) => {
                    console.log("error!");
                    console.log(error);
                });
        });
    };

    return state.auth.isLoggedIn !== null ? (
        <Layout>
            <div className={styles.title}>TOP</div>
            <div className={styles.text}>{state.auth.isLoggedIn ? `ログインしています` : `ログインしていません`}</div>
            <button onClick={logout} className={styles.btn} type="button">
                ログアウト
            </button>
            <div>
                <Link to={{ pathname: "/products" }}>Product一覧</Link>
            </div>
        </Layout>
    ) : null;
};

export default Top;
