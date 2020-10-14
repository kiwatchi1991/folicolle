import { divide } from "lodash";
import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import AppContext from "../contexts/AppContexts";
import LOGOUT from "../actions";

const Top = (props) => {
    const { state, dispatch } = useContext(AppContext);
    console.log("TOP画面読み込み時のstate", state);

    const isLoggedIn = () => getLocalStorage("isLoggedIn") === "true";

    const setLocalStorage = (key, value) => localStorage.setItem(key, value);

    const getLocalStorage = (key) => {
        const ret = localStorage.getItem(key);
        if (ret) {
            return ret;
        }
        return null;
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
                    setLocalStorage("isLoggedIn", false);
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
    return (
        <Layout>
            TOP
            {state.auth.isLoggedIn ? <div>ログインしています</div> : <div>ログインしていません</div>}
            <button onClick={logout}>ログアウト</button>
        </Layout>
    );
};

export default Top;
