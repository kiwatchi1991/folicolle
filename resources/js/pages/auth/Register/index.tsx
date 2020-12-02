import axios from "axios";
import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";

import { REGISTER } from "../../../actions";
import Layout from "../../../components/Layout";
import AppContext from "../../../contexts/AppContexts";

const styles = require("./index.modules.scss");

type defaultPropsType = {
    value: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    message: {
        name: string;
        email: string;
        password: string;
    };
    history: any;
};
const Register = (props: defaultPropsType) => {
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
                    console.log("response", response);
                    if (response.data.status === 422) {
                        console.log("status===422");
                        console.log(response.data.errors.email);
                        setState({
                            ...localState,
                            message: {
                                name: response.data.errors.name,
                                email: response.data.errors.email,
                                password: response.data.errors.password,
                            },
                        });

                        return;
                    }
                    dispatch({ type: REGISTER });
                    props.history.push("/");
                })
                .catch((error) => {
                    console.log("error!");
                });
        });
    };
    const toOAuthLoginPage = (provider: string) => {
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

    const validName = (name: string) => {
        console.log("validName!");
        console.log(name);
        if (!name) {
            return "ユーザー名を入力してください";
        }

        return "";
    };
    const validEmail = (email: string) => {
        console.log("validEmail!");
        console.log(email);
        if (!email) {
            return "メールアドレスを入力してください";
        }

        const regex = /^[!#$%&'*+\-./=?^_`{|}~[\]0-9a-zA-Z]+@[a-z0-9-_]+(\.[a-z0-9-_]+)+$/;
        if (!regex.test(email)) return "正しい形式でメールアドレスを入力してください";

        return "";
    };
    const validPassword = (password: string) => {
        if (!password) return "パスワードを入力してください";
        if (password.length < 8) return "パスワードは8文字以上で入力してください";

        return "";
    };

    const handleChange = (e: any) => {
        console.log("e");
        console.log(e.target.name);
        const eventType: "name" | "email" | "password" | "password_confirmation" = e.target.name;
        if (eventType === "name") {
            const nameMessage = validName(e.target.value);
            setState({
                ...localState,
                value: { ...localState.value, name: e.target.value },
                message: { ...localState.message, name: nameMessage },
            });
        } else if (eventType === "email") {
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
        }
    };

    return state.auth.isLoggedIn ? (
        <Redirect to="/" />
    ) : (
        <Layout>
            <div className={styles.body}>
                <div className={styles.wrapper}>
                    <div className={styles.inner}>
                        <div className={styles.title}>新規登録</div>
                        <ul className={styles.formWrap}>
                            <li className={styles.inputWrap}>
                                <input
                                    id="name"
                                    type="text"
                                    className={styles.input}
                                    name="name"
                                    value={localState.value.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="ユーザー名"
                                    required
                                    autoComplete="name"
                                />
                                {localState.message.name && (
                                    <span className={styles.error}>{localState.message.name}</span>
                                )}
                            </li>
                            <li className={styles.inputWrap}>
                                <input
                                    id="email"
                                    type="email"
                                    className={styles.input}
                                    name="email"
                                    value={localState.value.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="メールアドレス"
                                    required
                                    autoComplete="email"
                                />
                                {localState.message.email && (
                                    <span className={styles.error}>{localState.message.email}</span>
                                )}
                                <span className="invalid-feedback" role="alert" />
                            </li>

                            <li className={styles.inputWrap}>
                                <input
                                    id="password"
                                    type="password"
                                    className={styles.input}
                                    name="password"
                                    value={localState.value.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="パスワード"
                                    required
                                    autoComplete="new-password"
                                />
                                {localState.message.password && (
                                    <span className={styles.error}>{localState.message.password}</span>
                                )}
                            </li>
                            <li className={styles.inputWrap}>
                                <input
                                    id="password-confirm"
                                    type="password"
                                    className={styles.input}
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
                            <li className={styles.buttonWrap}>
                                <button
                                    type="button"
                                    className={styles.button}
                                    onClick={register}
                                    disabled={!(!localState.message.email && !localState.message.password)}
                                >
                                    新規登録
                                </button>
                            </li>
                            <li className={styles.or}>または</li>
                            <li>
                                <ul className={styles.sns}>
                                    <li>
                                        <button
                                            className={`${styles.snsBtn} ${styles.github}`}
                                            onClick={oAuthGithub}
                                            type="button"
                                        >
                                            <img src="/images/github.svg" alt="githubのアイコン" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`${styles.snsBtn} ${styles.google}`}
                                            onClick={oAuthGoogle}
                                            type="button"
                                        >
                                            <img src="/images/google.svg" alt="googleのアイコン" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`${styles.snsBtn} ${styles.twitter}`}
                                            onClick={oAuthTwitter}
                                            type="button"
                                        >
                                            <img src="/images/twitter.svg" alt="twitterのアイコン" />
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className={styles.toLogin}>
                                アカウントをお持ちでないですか？
                                <Link to={{ pathname: "Login" }} className={styles.toLoginLink}>
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
    },
};

export default Register;
