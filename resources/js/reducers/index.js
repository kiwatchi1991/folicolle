import { combineReducers } from "redux";

import auth from "./auth";
import firstLoad from "./firstLoad";
export default combineReducers({
    auth,
    firstLoad,
});
