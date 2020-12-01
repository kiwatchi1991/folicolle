import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

type defaultPropsType = {
    data: any;
};

const Index = (props: defaultPropsType) => {
    const [localState, setState] = useState(props);

    const getProductsData = () => {
        axios
            .get("/api/products/")
            .then((res: any) => {
                console.log(localState);
                console.log(res.data);
                // setState(res.data);
                setState({
                    ...localState,
                    data: res.data,
                });
            })
            .then((res) => {
                console.log("axios後のlocalState", localState.data);
            });
    };
    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <Layout>
            <div>あああ</div>
            {localState.data &&
                localState.data.map((item: any) => {
                    return (
                        <div key={item.id}>
                            {item.id}
                            {item.title}
                        </div>
                    );
                })}
        </Layout>
    );
};

Index.defaultProps = {
    data: null,
};

export default Index;
