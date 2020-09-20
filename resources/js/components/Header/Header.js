import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Header = styled.header`
  height: 80px;
  background: #eee;
`

const post = () => {
    return (
        <Header className="header">
            <Link to={{ pathname: 'Register' }}>Register</Link>
            <Link to={{ pathname: 'Login' }}>Login</Link>
        </Header>
    )
}

export default post
