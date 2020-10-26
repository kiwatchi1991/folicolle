import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AppContext from "../contexts/AppContexts";
import { LOGOUT } from "../actions";
import axios from 'axios';
import { AUTHCHECK } from "../actions";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Style from "../Style";
jsx;

type defaultPropsType = any
const Top = (props:defaultPropsType) => {
    //style
    const title = css`
        font-size: 2.4rem;
        margin-top: 24px;
        text-align: center;
    `;
    const text = css`
        font-size: 2.4rem;
        margin-top: 24px;
        text-align: center;
    `;
    const btn = css`
        display: block;
        background-color: ${Style.color.accent};
        color: #fff;
        padding: 8px 16px;
        border-radius: 5px;
        margin: 24px auto 0;
    `;
const { state, dispatch } = useContext(AppContext);

const isLoggedIn = async () => {
    await axios
        .get("/sanctum/csrf-cookie");
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
                .catch((error:any) => {
                    console.log("error!");
                    console.log(error);
                });
        });
    };
    return state.auth.isLoggedIn !== null ? (
        <Layout>
            <div css={title}>TOP</div>
            <div css={text}>{state.auth.isLoggedIn ? `ログインしています` : `ログインしていません`}</div>
            <button onClick={logout} css={btn}>
                ログアウト
            </button>
        </Layout>
    ) : (
            null
        );
};

export default Top;
