import React from "react";
import { jsx } from "@emotion/core";
import Header from "../Header/Header";
/** @jsx jsx */

jsx;

const Layout: ({ children }: { children: any }) => JSX.Element = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default Layout;
