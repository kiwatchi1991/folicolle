import { REGISTER } from "../actions";
import { LOGIN } from "../actions";
import { LOGOUT } from "../actions";
import { AUTHCHECK } from "../actions";

interface IStore {
    isLoggedIn?:any
}

interface IAction {
    type: any;
    loggedInUser?: any
}

const auth = (state: IStore = {}, action:IAction) => {
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
            const auth = action.loggedInUser ? true : false;
            return { isLoggedIn: auth };
        default:
            return state;
    }
};

export default auth;
