import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register member
export const registerMember = (memberData, history) => (dispatch) => {
  axios
    .post("/api/members/register", memberData)
    .then((res) => {      
      history.push("/login")
      dispatch(emailNewMember(memberData));
      dispatch(emailClub(memberData));
    }) // Redirect to login on successful registration
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login- get member token
export const loginMember = (memberData) => (dispatch) => {
  axios
    .post("/api/members/login", memberData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current member
      dispatch(setCurrentMember(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in member
export const setCurrentMember = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log member out
export const logoutMember = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentMember({}));
};

export const emailNewMember = (user) => (dispatch) => {
  axios
    .post("/api/email/newMember", user)
    .then((res) => console.log(res))
    .catch((err) => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    })
  )
}

export const emailClub = (user) => (dispatch) => {
  axios
    .post("/api/email/club", user)
    .then((res) => console.log(res))
    .catch((err) => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}
