import { REGISTER } from "../actions";
import { LOGIN } from "../actions";
import { LOGOUT } from "../actions";
import { AUTHCHECK } from "../actions";

const auth = (state = [], action) => {
    switch (action.type) {
        case REGISTER:
            console.log("REGISTER！！！");
            return { isLoggedIn: true };
        case LOGIN:
            console.log("LOGIN！！！");
            return { isLoggedIn: true };
        case LOGOUT:
            console.log("dispatchのlogout");
            return { isLoggedIn: false };
        case AUTHCHECK:
            console.log("dispatchのauthCheck");
            return { isLoggedIn: true };
        default:
            return state;
    }
};

export default auth;
