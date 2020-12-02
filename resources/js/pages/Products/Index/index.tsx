import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";

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
                            <div>画像パス：{item.img}</div>
                            <div>
                                {item.categories.map((category: any) => {
                                    return <div key={category.id}>{category.name}</div>
                                })}
                            </div>
                            <div>{item.title}</div>
                            <div>{item.description}</div>
                            <div>ユーザーimg{item.user.img}</div>
                            <div>ユーザーname{item.user.name}</div>
                            <div>ユーザーコメント{item.user.comment}</div>
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
