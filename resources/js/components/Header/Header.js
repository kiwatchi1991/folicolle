import React from "react";
import { Link } from "react-router-dom";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Style from "../../Style/index";

const Header = () => {
    const header = css`
        font-size: 20px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
    `;
    const ul = css`
        display: flex;
        margin-right: 100px;
    `;
    const list = css`
        list-style: none;
        font-size: 14px;
        margin-left: 20px;
    `;
    return (
        <div css={header}>
            <div>
                <Link to={{ pathname: "/" }}>Folicolle</Link>
            </div>
            <ul css={ul}>
                <li css={list}>
                    <Link to={{ pathname: "Login" }}>Login</Link>
                </li>
                <li css={list}>
                    <Link to={{ pathname: "Register" }}>Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
