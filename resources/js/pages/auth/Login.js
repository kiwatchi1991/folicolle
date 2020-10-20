import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Style from "../../Style";
import { Redirect } from "react-router-dom";
import { LOGIN } from "../../actions";
import AppContext from "../../contexts/AppContexts";

const Login = (props) => {
    //style
    const body = css`
        background: ${Style.color.bg};
        height: 100%;
        padding-top: 80px;
    `;

    const wrapper = css`
        background: #fff;
        border-radius: 5px;
        margin-top: 32px;
        width: 300px;
        display: flex;
        margin: 0 auto;
        padding: 24px;
        text-align: center;
    `;
    const inner = css`
        width: 100%;
    `;
    const title = css`
        color: ${Style.color.main};
        font-size: 2rem;
        margin: 8px 0;
    `;
    const formWrap = css`
        margin-top: 18px;
    `;
    const inputrap = css`
        margin-top: 12px;
    `;
    const input = css`
        border: 1px solid ${Style.color.main};
        border-radius: 5px;
        padding: 16px;
        width: 100%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
        background: none;
        &::placeholder {
            color: ${Style.color.main};
        }
    `;
    const button = css`
        width: 100%;
        padding: 16px;
        background: ${Style.color.main};
        color: #fff;
        border: none;
        border-radius: 5px;
        height: 50px;
    `;
    const buttonWrap = css`
        margin-top: 12px;
    `;
    const forget = css`
        margin-top: 24px;
        color: ${Style.color.main};
        font-size: 1.4rem;
    `;
    const forgetLink = css`
        margin-left: 4px;
        color: ${Style.color.accent};
        :visited {
            color: ${Style.color.accent};
        }
    `;
    const or = css`
        position: relative;
        font-size: 1.4rem;
        margin: 24px auto;
        color: ${Style.color.main};
        &:before {
            left: 0;
        }
        &:after {
            right: 0;
        }
        &:before,
        &:after {
            content: "";
            display: block;
            width: 88px;
            height: 1px;
            position: absolute;
            top: 50%;
            background-color: ${Style.color.main};
        }
    `;
    const sns = css`
        display: flex;
        justify-content: space-between;
    `;
    const snsBtn = css`
        background: #333;
        width: 75px;
        border-radius: 3px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    const github = css`
        background: #171515;
    `;
    const google = css`
        background: #dd5144;
    `;
    const twitter = css`
        background: #1da1f2;
    `;
    const a = css`
        //
    `;
    const toRegister = css`
        margin-top: 32px;
        color: ${Style.color.main};
        font-size: 1.2rem;
    `;
    const toRegisterLink = css`
        margin-left: 4px;
        color: ${Style.color.accent};
        &:visited {
            color: ${Style.color.accent};
        }
    `;
    const { state, dispatch } = useContext(AppContext);
    console.log("dLOGIn画面読み込み時のstate", state);

    const [localState, setState] = useState(props);

    const login = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", {
                    email: localState.email,
                    password: localState.password,
                })
                .then((response) => {
                    console.log("response", response);
                    dispatch({ type: LOGIN });
                    console.log("dispatchあとのstate", state);
                    props.history.push("/");
                })
                .catch(() => {
                    console.log("error!");
                });
        });
    };
    const oAuthLogin = (prop) => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .get(`/login/${prop}/`)
                .then((response) => {
                    console.log("response", response);
                    dispatch({ type: LOGIN });
                    console.log("dispatchあとのstate", state);
                    props.history.push("/");
                })
                .catch(() => {
                    console.log("error!");
                });
        });
    };
    const oAuthTwitter = () => {
        oAuthLogin("twitter");
    };
    return state.auth.isLoggedIn ? (
        <Redirect to={"/"} />
    ) : (
        <Layout>
            <div css={body}>
                <div css={wrapper}>
                    <div css={inner}>
                        <div css={title}>ログイン</div>
                        <ul css={formWrap}>
                            <li css={inputrap}>
                                <input
                                    id="email"
                                    type="email"
                                    css={input}
                                    name="email"
                                    value={localState.email}
                                    placeholder="メールアドレス"
                                    onChange={(e) => setState({ ...localState, email: e.target.value })}
                                />
                                <span css={a} role="alert">
                                    <strong></strong>
                                </span>
                            </li>
                            <li css={inputrap}>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    css={input}
                                    value={localState.password}
                                    placeholder="パスワード"
                                    onChange={(e) => setState({ ...localState, password: e.target.value })}
                                />

                                <span css={a} role="alert">
                                    <strong></strong>
                                </span>
                            </li>
                            {/* <li css={a}>
                                    <input css={a} type="checkbox" name="remember" id="remember" />

                                    <label css={a} htmlFor="remember">
                                        Remember me
                                    </label>
                                </li> */}
                            <li css={buttonWrap}>
                                <button type="button" css={button} onClick={login}>
                                    ログイン
                                </button>
                            </li>
                            <li css={forget}>
                                パスワードを忘れた方は
                                {/* <Link css={forgetLink} href="/password/request">
                                    こちら
                                </Link> */}
                            </li>
                            <li css={or}>または</li>
                            <li>
                                <ul css={sns}>
                                    <li>
                                        <button css={[snsBtn, github]}>
                                            <img src="/images/github.svg" alt="githubのアイコン" />
                                        </button>
                                    </li>
                                    <li>
                                        <button css={[snsBtn, google]}>
                                            <img src="/images/google.svg" alt="googleのアイコン" />
                                        </button>
                                    </li>
                                    <li>
                                        <button css={[snsBtn, twitter]} onClick={oAuthTwitter}>
                                            <img src="/images/twitter.svg" alt="twitterのアイコン" />
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li css={toRegister}>
                                アカウントをお持ちでないですか？
                                <Link to={{ pathname: "Register" }} css={toRegisterLink}>
                                    新規登録
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <Logout history={props} />
            <Link to={{ pathname: "Register" }}>Register</Link>
            <Link to={{ pathname: "Login" }}>Login</Link> */}
        </Layout>
    );
};
Login.defaultProps = {
    email: "",
    password: "",
};

export default Login;
