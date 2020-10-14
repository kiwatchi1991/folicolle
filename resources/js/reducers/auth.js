import { LOGIN } from "../actions";
import { Logout } from "../pages/auth/Logout";

const auth = (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN！！！");
            return { isLoggedIn: true };
        case Logout:
            console.log("dispatchのlogout");
            return { isLoggedIn: false };
        default:
            return state;
    }
};

export default auth;
