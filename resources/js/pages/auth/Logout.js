import axios from "axios";
import React from "react";

const Logout = (props) => {
    const logout = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/logout")
                .then((response) => {
                    console.log("response", response);
                    console.log("props", props);

                    // eslint-disable-next-line react/prop-types
                    props.history.push("/");
                })
                .catch((error) => {
                    console.log("error!");
                    console.log(error);
                });
        });
    };
    return (
        <div className="form-group row mb-0">
            <div className="col-md-8 offset-md-4">
                <button type="button" className="btn btn-primary" onClick={logout}>
                    ログアウト
                </button>
            </div>
        </div>
    );
};

export default Logout;
