import axios from "axios";

import { GET_ERRORS, SET_USER_LIST } from "./types";

// Get list of Users
export function getUsers() {
  return function (dispatch) {
    axios
      .get("/api/members")
      .then((users) => {
        dispatch(setUserList(users.data));
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        })
      );
  };
}

export const setUserList = (users) => {
  return {
    type: SET_USER_LIST,
    payload: users,
  };
};

export function promoteUser(user) {
  return function (dispatch) {
    axios
      .put("/api/members/promote", user)
      .then((res) => {
        window.alert(user.firstname + " was successfully " + res.data);
      })
      .catch((err) =>{
        window.alert("Unable to promote user (Probably admin already)");
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      });
  };
}

export function demoteUser(user) {
  return function (dispatch) {
    axios
      .put("/api/members/demote", user)
      .then((res) => {
        window.alert(user.firstname + " was successfully " + res.data);
      })
      .catch((err) => {
        window.alert("Unable to demote user (Probably root admin)")
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      });
  };
}

export function deleteUser(user) {
  return function (dispatch) {
    axios
      .post("/api/members", user)
      .then((res) => {
        window.alert("User deleted")
        console.log(res.data);
      })
      .catch((err) => {
        window.alert("Unable to delete user (Probably root admin)")
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      });
  };
}
