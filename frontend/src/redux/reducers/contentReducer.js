import { SET_ANNOUNCEMENT, SET_POST_LIST } from "../actions/types";

const initialState = {
    
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ANNOUNCEMENT:
            return {
                ...state,
                announcement: action.payload.data,
            };
        case SET_POST_LIST:
            console.log(action.payload)
            return {
                ...state,
                posts: action.payload.data,
            };
        default:
            return state;
    }
}