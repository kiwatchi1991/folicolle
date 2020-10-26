import axios from "axios";
import React, { useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { REGISTER } from "../../actions";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Style from "../../Style";
import AppContext from "../../contexts/AppContexts";
jsx;
type defaultPropsType = {
    value: {
        name: string
        email: string
        password: string,
        password_confirmation: string,
    },
    message: {
        name: string
        email: string
        password: string,
    },
    history: any,
};
const Register = (props:defaultPropsType) => {
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
        &:disabled{
            opacity: 0.4;
        }
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
    const toLogin = css`
        margin-top: 32px;
        color: ${Style.color.main};
        font-size: 1.2rem;
    `;
    const toLoginLink = css`
        margin-left: 4px;
        color: ${Style.color.accent};
        &:visited {
            color: ${Style.color.accent};
        }
    `;
    const { state, dispatch } = useContext(AppContext);
    const [localState, setState] = useState(props);

    const register = () => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/api/register", {
                    name: localState.value.name,
                    email: localState.value.email,
                    password: localState.value.password,
                    password_confirmation: localState.value.password_confirmation,
                })
                .then((response) => {
                    dispatch({ type: REGISTER });
                    props.history.push("/");
                })
                .catch((error) => {
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

    const validName = (name:string) => {
        console.log("validName!");
        console.log(name);
        if (!name) {
            return "ユーザー名を入力してください";
        }
        return "";
    };
    const validEmail = (email:string) => {
        console.log("validEmail!");
        console.log(email);
        if (!email) {
            return "メールアドレスを入力してください";
        }

        const regex = /^[!#$%&'*+\-./=?^_`{|}~[\]0-9a-zA-Z]+@[a-z0-9-_]+(\.[a-z0-9-_]+)+$/;
        if (!regex.test(email)) return "正しい形式でメールアドレスを入力してください";

        return "";
    };
    const validPassword = (password:string) => {
        if (!password) return "パスワードを入力してください";
        if (password.length < 8) return "パスワードは8文字以上で入力してください";

        return "";
    };

    const handleChange = (e:any) => {
        console.log("e");
        console.log(e.target.name);
        const eventType:("name" | "email" | "password" | "password_confirmation") = e.target.name;
        if (eventType === "name") {
            const nameMessage = validName(e.target.value);
            setState({
                ...localState,
                value: { ...localState.value, name: e.target.value },
                message: { ...localState.message, name: nameMessage },
            });
        } else if(eventType === "email") {
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
        } else if (eventType === "password_confirmation") {
            setState({
                ...localState,
                value: { ...localState.value, password_confirmation: e.target.value },
            });
        };
    };
    return state.auth.isLoggedIn ? (
        <Redirect to={"/"} />
    ) : (
        <Layout>
            <div css={body}>
                <div css={wrapper}>
                    <div css={inner}>
                        <div css={title}>新規登録</div>
                        <ul css={formWrap}>
                            <li css={inputWrap}>
                                <input
                                    id="name"
                                    type="text"
                                    css={input}
                                    name="name"
                                    value={localState.value.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="ユーザー名"
                                    required
                                    autoComplete="name"
                                    />
                                    {localState.message.name && <span css={error}>{localState.message.name}</span>}
                            </li>
                            <li css={inputWrap}>
                                <input
                                    id="email"
                                    type="email"
                                    css={input}
                                    name="email"
                                    value={localState.value.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="メールアドレス"
                                    required
                                    autoComplete="email"
                                />
                                {localState.message.email && <span css={error}>{localState.message.email}</span>}
                                <span className="invalid-feedback" role="alert"></span>
                            </li>

                            <li css={inputWrap}>
                                <input
                                    id="password"
                                    type="password"
                                    css={input}
                                    name="password"
                                    value={localState.value.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="パスワード"
                                    required
                                    autoComplete="new-password"
                                />
                            {localState.message.password && <span css={error}>{localState.message.password}</span>}
                            </li>
                            <li css={inputWrap}>
                                <input
                                    id="password-confirm"
                                    type="password"
                                    css={input}
                                    name="password_confirmation"
                                    value={localState.value.password_confirmation}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="パスワード確認"
                                    required
                                    autoComplete="new-password"
                                />
                            </li>
                            <li css={buttonWrap}>
                                <button type="button" css={button} onClick={register} disabled={!(!localState.message.email && !localState.message.password) }>
                                    新規登録
                                </button>
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
                                        <button css={[snsBtn, twitter]}>
                                            <img src="/images/twitter.svg" alt="twitterのアイコン" />
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li css={toLogin}>
                                アカウントをお持ちでないですか？
                                <Link to={{ pathname: "Login" }} css={toLoginLink}>
                                    ログイン
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
Register.defaultProps = {
    value: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    },
    message: {
        name: "",
        email: "",
        password: "",
    }
};

export default Register;
