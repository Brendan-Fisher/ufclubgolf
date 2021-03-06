import { SET_ANNOUNCEMENT, SET_EVENT_LIST, SET_POST_LIST, SET_TOURNAMENT_LIST } from "../actions/types";

const initialState = {
    announcement: "",
    posts: [],
    events: [],
    tournaments: [],
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
            return {
                ...state,
                posts: action.payload.data,
            };
        case SET_EVENT_LIST:
            return {
                ...state,
                events: action.payload.data,
            }
        case SET_TOURNAMENT_LIST:
            return {
                ...state,
                tournaments: action.payload.data,
            }
        default:
            return state;
    }
}