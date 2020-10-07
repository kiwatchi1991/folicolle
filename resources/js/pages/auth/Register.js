import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

const Register = (props) => {
    const [state, setState] = useState(props)

    const register = () => {
        console.log(state.name, state.email, state.password, state.password_confirmation);
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios
                .post("/api/register", {
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    password_confirmation: state.password_confirmation
                })
                .then(response => {
                    const token = response.data.token;
                    console.log("response", response.data.token);
                    localStorage.setItem("auth", token);
                })
                .catch(error => {
                    console.log("error!");
                })
        })
    }
    return (
      <Layout>
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-8">
                      <div className="card">
                          <div className="card-header">Register</div>

                          <div className="card-body">
                              <form method="POST" action="">
                                <div className="form-group row">
                                      <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                      <div className="col-md-6">
                                      <input id="name" type="text" className="form-control" name="name" value={state.name} onChange={e => setState({ ...state, name: e.target.value })} required autoComplete="name" autoFocus />

                                    <span className="invalid-feedback" role="alert">
                                              </span>
                                    </div>
                                      </div>

                                      <div className="form-group row">
                                          <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                          <div className="col-md-6">
                                      <input id="email" type="email" className="form-control" name="email" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} required autoComplete="email" />

                                    <span className="invalid-feedback" role="alert">
                                                  </span>
                            </div>
                                          </div>

                                          <div className="form-group row">
                                              <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                              <div className="col-md-6">
                                      <input id="password" type="password" className="form-control" name="password" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} required autoComplete="new-password" />

                                    <span className="invalid-feedback" role="alert">
                                                      </span>
                            </div>
                                              </div>

                                                <div className="form-group row">
                                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                                    <div className="col-md-6">
                                                        <input id="password-confirm" type="password" className="form-control" name="password_confirmation" value={state.password_confirmation} onChange={e => setState({...state, password_confirmation: e.target.value})} required autoComplete="new-password" />
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-0">
                                                    <div className="col-md-6 offset-md-4">
                                                        <button type="button" className="btn btn-primary" onClick={register}>
                                                            'Register'
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
          </div>
          <Link to={{ pathname: 'Register' }}>Register</Link>
          <Link to={{ pathname: 'Login' }}>Login</Link>
            </div>
            </Layout>
  )
}
Register.defaultProps = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
}

export default Register
