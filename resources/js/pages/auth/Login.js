import axios from "axios";
import React, { useState } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Login = (props) => {
    const [state, setState] = useState(props);

    const login = () => {
        console.log(state.email, state.password);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", {
                    email: state.email,
                    password: state.password,
                })
                .then((response) => {
                    console.log("props", props);
                    props.history.push("/");
                    console.log("response");
                    console.log(response);
                })
                .catch(() => {
                    console.log("error!");
                });
        });
    };
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">ログイン</div>

                            <div className="card-body">
                                <form method="POST" action="/login">
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                                            Emil
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                required
                                                value={state.email}
                                                onChange={(e) => setState({ ...state, email: e.target.value })}
                                            />

                                            <span className="invalid-feedback" role="alert">
                                                <strong></strong>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                                            Password
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={state.password}
                                                onChange={(e) => setState({ ...state, password: e.target.value })}
                                            />

                                            <span className="invalid-feedback" role="alert">
                                                <strong></strong>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="remember"
                                                    id="remember"
                                                />

                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="button" className="btn btn-primary" onClick={login}>
                                                Login
                                            </button>

                                            <a className="btn btn-link" href="{{ route('password.request') }}">
                                                Forgot Your Password?'
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Logout history={props} />
            <Link to={{ pathname: "Register" }}>Register</Link>
            <Link to={{ pathname: "Login" }}>Login</Link>
        </Layout>
    );
};
Login.defaultProps = {
    email: "",
    password: "",
};

export default Login;
