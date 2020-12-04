import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";

const styles = require("./index.modules.scss");

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

    const productImg = {
        backgroundImage: "url(/images/noimage.png)",
    };
    const userImg = {
        backgroundImage: "url(/images/noavatar.png)",
    };

    return (
        <Layout>
            <div className={styles.inner}>
                <div className={styles.header}>ポートフォリオ一覧</div>
                <div className={styles.cards}>
                    {localState.data &&
                        localState.data.map((item: any) => {
                            return (
                                <div key={item.id} className={styles.card}>
                                    <div className={styles.img} style={productImg} />
                                    <div className={styles.bottom_half}>
                                        <div className={styles.tags}>
                                            {item.categories.map((category: any) => {
                                                return (
                                                    <div key={category.id} className={styles.tag}>
                                                        {category.name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.product_info}>
                                            <div className={styles.title}>{item.title}</div>
                                            <div className={styles.description}>{item.description}</div>
                                        </div>
                                        <div className={styles.user}>
                                            <div className={styles.user_img} style={userImg} />
                                            <div className={styles.user_info}>
                                                <div className={styles.user_name}>{item.user.name}</div>
                                                <div className={styles.user_comment}>{item.user.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Layout>
    );
};

Index.defaultProps = {
    data: null,
};

export default Index;
