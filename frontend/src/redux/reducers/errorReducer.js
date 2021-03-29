import { GET_ERRORS } from "../actions/types";

const initialState = {};

// eslint-disable-next-line
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            window.alert("Unable to modify root admin");
            return action.payload;
        default:
            return state;
    }
}