import axios from 'axios'
import React, { useEffect } from 'react'

const Login = () => {
    const token = document.head.querySelector('meta[name="csrf-token"]').content
    const authConfirm = async (e) => {
        const res = await axios.get('/auth')
            .then((res) => {
            console.log('then', res);
        }).catch((res) => {
            console.log('catch', res);
        })
        return res
        // console.log('res',res);
    }

    useEffect(() => {
        console.log('useEffect');
        authConfirm();
    }, [])
    const submitLoginForm = (e) => {
        e.preventDefault()
        console.log('submit!!!');
    }
    return (
    <div>
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">ログイン</div>

                    <div className="card-body">
                        <form method="POST" action="/login">
                            <input type="hidden" value={token} name="_token"/>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Emil</label>

                                <div className="col-md-6">
                                    <input id="email" type="email" className="form-control" name="email" required />

                                        <span className="invalid-feedback" role="alert">
                                            <strong></strong>
                                        </span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" name="password" />

                                        <span className="invalid-feedback" role="alert">
                                            <strong></strong>
                                        </span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember"/>

                                        <label className="form-check-label" htmlFor="remember">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary" onSubmit={submitLoginForm}>
                                        Login
                                    </button>

                                        <a className="btn btn-link" href="{{ route('password.request') }}">
                                            Forgot Your Password?'hpp
                                        </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default Login
