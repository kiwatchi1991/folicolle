import React from "react";
import { Link } from "react-router-dom";
const styles = require("./Header.modules.scss");

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Link to={{ pathname: "/" }}>Folicolle</Link>
            </div>
            <ul className={styles.ul}>
                <li className={styles.list}>
                    <Link to={{ pathname: "Login" }}>Login</Link>
                </li>
                <li className={styles.list}>
                    <Link to={{ pathname: "Register" }}>Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
