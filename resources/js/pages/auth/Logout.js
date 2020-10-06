import axios from 'axios'
import React,{useEffect} from 'react'

const Logout = () => {
    const logout = async () => {
        const res = await axios.get("/sanctum/csrf-cookie").then(response => {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .post("/api/logout")
                    .then(response => {
                        console.log("response", response);
                        localStorage.removeItem("auth");
                    })
                    .catch(error => {
                        console.log("error!");
                    })
            })
            return res
        })
    }
    return (
        <div className="form-group row mb-0">
            <div className="col-md-8 offset-md-4">
                <button type="button" className="btn btn-primary" onClick={logout}>
                    ログアウト
                                    </button>
            </div>
        </div>
    )
}

export default Logout
