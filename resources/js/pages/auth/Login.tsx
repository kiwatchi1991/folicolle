import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { LOGIN } from "../../actions";
import AppContext from "../../contexts/AppContexts";

const styles = require("./Login.modules.scss");

type defaultPropsType = {
    value: {
        email: string;
        password: string;
    };
    message: {
        email: string;
        password: string;
    };
    history: any;
};

const Login = (props: defaultPropsType) => {
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
                    if (response.data.status === 422) {
                        console.log("status===422");
                        console.log(response.data.errors.email);
                        setState({
                            ...localState,
                            message: {
                                email: response.data.errors.email,
                                password: response.data.errors.password,
                            },
                        });

                        return;
                    }
                    dispatch({ type: LOGIN });
                    console.log("dispatchあとのstate", state);
                    props.history.push("/");
                })
                .catch(() => {
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
        const eventType: "email" | "password" = e.target.name;
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

    // バリデーション
    return (
        <Layout>
            <div className={styles.body}>
                <div className={styles.wrapper}>
                    <div className={styles.inner}>
                        <div className={styles.title}>ログイン</div>
                        <form>
                            <ul className={styles.formWrap}>
                                <li className={styles.inputWrap}>
                                    <input
                                        id="email"
                                        type="email"
                                        className={styles.input}
                                        name="email"
                                        value={localState.value.email}
                                        placeholder="メールアドレス"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {localState.message.email && (
                                        <span className={styles.error}>{localState.message.email}</span>
                                    )}
                                </li>
                                <li className={styles.inputWrap}>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        className={styles.input}
                                        value={localState.value.password}
                                        placeholder="パスワード"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {localState.message.password && (
                                        <span className={styles.error}>{localState.message.password}</span>
                                    )}
                                </li>
                                <li className={styles.buttonWrap}>
                                    <button
                                        type="button"
                                        className={styles.button}
                                        onClick={login}
                                        disabled={!(!localState.message.email && !localState.message.password)}
                                    >
                                        ログイン
                                    </button>
                                </li>
                                <li className={styles.forget}>
                                    パスワードを忘れた方は
                                    {/* <Link className={styles.forgetLink} href="/password/request">
                                    こちら
                                </Link> */}
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
                                <li className={styles.toRegister}>
                                    アカウントをお持ちでないですか？
                                    <Link to={{ pathname: "Register" }} className={styles.toRegisterLink}>
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
