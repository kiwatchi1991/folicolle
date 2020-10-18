import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import AppContext from "../contexts/AppContexts";
import { LOGOUT } from "../actions";
import { AUTHCHECK } from "../actions";
import { LOAD } from "../actions";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Style from "../Style";

const Top = (props) => {
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

    const res = () => {
        return axios
            .get("/sanctum/csrf-cookie")
            .then(() => axios.get("/api/auth"))
            .then((response) => {
                response.data.user && dispatch({ type: AUTHCHECK });
                dispatch({ type: LOAD });
                console.log("TOPのdispatchのあと" + state.auth.isLoggedIn);
            });
    };

    useEffect(() => {
        res();
    }, []);
    const { state, dispatch } = useContext(AppContext);

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
                .catch((error) => {
                    console.log("error!");
                    console.log(error);
                });
        });
    };
    return !state.firstLoad ? (
        <Layout>
            <div css={title}>TOP</div>
            <div css={text}>{state.auth.isLoggedIn ? `ログインしています` : `ログインしていません`}</div>
            <button onClick={logout} css={btn}>
                ログアウト
            </button>
        </Layout>
    ) : (
        ""
    );
};

export default Top;
