import { LOAD } from "../actions";

const firstLoad = (state = [], action) => {
    switch (action.type) {
        case LOAD:
            console.log("dispatchのLOAD");
            console.log(state);
            return false;
        default:
            return state;
    }
};

export default firstLoad;
