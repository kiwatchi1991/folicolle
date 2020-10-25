import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Style from "../../Style";
import { Redirect } from "react-router-dom";
import { LOGIN } from "../../actions";
import AppContext from "../../contexts/AppContexts";
jsx;

type defaultPropsType = {
    value: {
        email: string
        password: string
    },
    message: {
        email: string
        password: string
    },
    history: any
};
const Login = (props:defaultPropsType) => {
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
    const inputWrap = css`
        margin-top: 12px;
        text-align: left;
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
    const error = css`
        color: red;
        margin-top: 4px;
        font-size: 14px;
        display: block;
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
    console.log("ログイン画面読み込み時のstate", state);

    const [localState, setState] = useState(props);

    const login = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", {
                    email: localState.value.email,
                    password: localState.value.password,
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
    const toOAuthLoginPage = (provider:string) => {
        window.location.href = `/login/${provider}`;
    };
    const oAuthTwitter = () => {
        toOAuthLoginPage("twitter");
    };
    const oAuthGithub = () => {
        toOAuthLoginPage("github");
    };
    const oAuthGoogle = () => {
        toOAuthLoginPage("google");
    };
<<<<<<< HEAD:resources/js/pages/auth/Login.js
    const validEmail = (email) => {
        if (!email) return "メールアドレスを入力してください";
=======
    const validEmail = (email:string) => {
        console.log("validEmail!");
        console.log(email);
        if (!email) {
            return "メールアドレスを入力してください";
        }
>>>>>>> b5a627286e5f85beeb79a2939c6f442ca39aea83:resources/js/pages/auth/Login.tsx

        const regex = /^[!#$%&'*+\-./=?^_`{|}~[\]0-9a-zA-Z]+@[a-z0-9-_]+(\.[a-z0-9-_]+)+$/;
        if (!regex.test(email)) return "正しい形式でメールアドレスを入力してください";

        return "";
    };
    const validPassword = (password) => {
        if (!password) return "パスワードを入力してください";
        if (password.length < 8) return "パスワードは8文字以上で入力してください";

        return "";
    };

<<<<<<< HEAD:resources/js/pages/auth/Login.js
    const handleChange = (e) => {
=======
    const handleChange = (e:any) => {
        console.log("e");
        console.log(e.target.name);
>>>>>>> b5a627286e5f85beeb79a2939c6f442ca39aea83:resources/js/pages/auth/Login.tsx
        const eventType = e.target.name;
        if (eventType === "email") {
            const emailMessage = validEmail(e.target.value);
            setState({
                ...localState,
                value: { ...localState.value, email: e.target.value },
                message: { ...localState.message, email: emailMessage },
            });
        } else if (eventType === "password") {
            const passwordMessage = validPassword(e.target.value);
            setState({
                ...localState,
                value: { ...localState.value, password: e.target.value },
                message: { ...localState.message, password: passwordMessage },
            });
        }
    };

    //バリデーション
    return state.auth.isLoggedIn ? (
        <Redirect to={"/"} />
    ) : (
        <Layout>
            <div css={body}>
                <div css={wrapper}>
                    <div css={inner}>
                        <div css={title}>ログイン</div>
                        <form>
                            <ul css={formWrap}>
                                <li css={inputWrap}>
                                    <input
                                        id="email"
                                        type="email"
                                        css={input}
                                        name="email"
                                        value={localState.value.email}
                                        placeholder="メールアドレス"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {localState.message.email && <span css={error}>{localState.message.email}</span>}
                                </li>
                                <li css={inputWrap}>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        css={input}
                                        value={localState.value.password}
                                        placeholder="パスワード"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {localState.message.password && (
                                        <span css={error}>{localState.message.password}</span>
                                    )}
                                </li>
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
                                            <button css={[snsBtn, github]} onClick={oAuthGithub}>
                                                <img src="/images/github.svg" alt="githubのアイコン" />
                                            </button>
                                        </li>
                                        <li>
                                            <button css={[snsBtn, google]} onClick={oAuthGoogle}>
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
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
Login.defaultProps = {
    value: {
        email: "",
        password: "",
    },
    message: {
        email: "",
        password: "",
    },
};

export default Login;
