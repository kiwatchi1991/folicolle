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
    name: string
    email: string
    password: string,
    password_confirmation: string,
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
                    name: localState.name,
                    email: localState.email,
                    password: localState.password,
                    password_confirmation: localState.password_confirmation,
                })
                .then((response) => {
                    dispatch({ type: REGISTER });
                })
                .catch((error) => {
                    console.log("error!");
                });
        });
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
                                    value={localState.name}
                                    onChange={(e) => setState({ ...localState, name: e.target.value })}
                                    placeholder="ユーザー名"
                                    required
                                    autoComplete="name"
                                />
                            </li>
                            <li css={inputWrap}>
                                <input
                                    id="email"
                                    type="email"
                                    css={input}
                                    name="email"
                                    value={localState.email}
                                    onChange={(e) => setState({ ...localState, email: e.target.value })}
                                    placeholder="メールアドレス"
                                    required
                                    autoComplete="email"
                                />

                                <span className="invalid-feedback" role="alert"></span>
                            </li>

                            <li css={inputWrap}>
                                <input
                                    id="password"
                                    type="password"
                                    css={input}
                                    name="password"
                                    value={localState.password}
                                    onChange={(e) => setState({ ...localState, password: e.target.value })}
                                    placeholder="パスワード"
                                    required
                                    autoComplete="new-password"
                                />

                                <span className="invalid-feedback" role="alert"></span>
                            </li>
                            <li css={inputWrap}>
                                <input
                                    id="password-confirm"
                                    type="password"
                                    css={input}
                                    name="password_confirmation"
                                    value={localState.password_confirmation}
                                    onChange={(e) => setState({ ...localState, password_confirmation: e.target.value })}
                                    placeholder="パスワード確認"
                                    required
                                    autoComplete="new-password"
                                />
                            </li>
                            <li css={buttonWrap}>
                                <button type="button" css={button} onClick={register}>
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
                                    新規登録
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
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};

export default Register;
