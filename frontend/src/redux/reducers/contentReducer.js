import { SET_ANNOUNCEMENT } from "../actions/types";

const initialState = {
    
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ANNOUNCEMENT:
            return {
                ...state,
                announcement: action.payload.data,
            }
        default:
            return state;
    }
}