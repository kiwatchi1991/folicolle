import React from "react";
import { Link } from "react-router-dom";

const styles = require("./index.modules.scss");

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_inner}>
                <div className={styles.logo}>
                    <Link to={{ pathname: "/" }}>
                        <img className={styles.logo_img} src="/images/folicolle.svg" alt="" />
                    </Link>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.list}>
                        <Link className={`${styles.link} ${styles.login}`} to={{ pathname: "login" }}>
                            ログイン
                        </Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={`${styles.link} ${styles.register}`} to={{ pathname: "register" }}>
                            新規登録
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
