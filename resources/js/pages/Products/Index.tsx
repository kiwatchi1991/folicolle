import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

type defaultPropsType = {
    data: any;
};

const Index = (props: defaultPropsType) => {
    const getProductsData = () => {
        axios.get("/api/products/").then((res: any) => {
            setState(res);
            console.log(localState);
        });
    };
    useEffect(() => {
        getProductsData();
    }, []);
    const [localState, setState] = useState(props);

    return (
        <Layout>
            <div>あああ</div>
            {/* <div>{localState}</div> */}
        </Layout>
    );
};

Index.defaultProps = {
    data: [],
};

export default Index;
