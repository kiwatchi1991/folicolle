import React from "react";
import Header from "../Header";

const Layout: ({ children }: { children: any }) => JSX.Element = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;
