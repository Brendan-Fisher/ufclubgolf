import { SET_USER_LIST } from "../actions/types";

const initialState = {
  memberList: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        memberList: action.payload,
      };
    default:
      return state;
  }
}
