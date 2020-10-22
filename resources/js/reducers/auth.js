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
            // eslint-disable-next-line no-case-declarations
            const auth = action.loggedInUser ? true : false;
            return { isLoggedIn: auth };
        default:
            return state;
    }
};

export default auth;
