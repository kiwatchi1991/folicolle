import { jsx } from "@emotion/core";
import React from "react";
import Header from "../Header/Header";
jsx;
const Layout: ({ children }: {
    children: any;
}) => JSX.Element = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default Layout;
