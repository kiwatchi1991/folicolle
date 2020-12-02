import React from "react";
import { Link } from "react-router-dom";

const styles = require("./index.modules.scss");

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Link to={{ pathname: "/" }}>Folicolle</Link>
            </div>
            <ul className={styles.ul}>
                <li className={styles.list}>
                    <Link className={styles.link} to={{ pathname: "Login" }}>
                        ログイン
                    </Link>
                </li>
                <li className={styles.list}>
                    <Link className={`${styles.link} ${styles.register}`} to={{ pathname: "Register" }}>
                        新規登録
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
