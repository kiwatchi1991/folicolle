import React from 'react';
import { Redirect } from 'react-router-dom';

const Auth = props => {
    const isLoggedIn = async () => {
        const res = await axios.get("/sanctum/csrf-cookie").then(response => {
            axios.get('/api/user')
                .then((res) => {
                    console.log('then', res);
                }).catch((res) => {
                })
            return res
        })
    }
    return (
        isLoggedIn() ? props.children : <Redirect to={'/login'}/>
    )
}

export default Auth;
