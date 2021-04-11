import axios from "axios";
import { GET_ERRORS, SET_ANNOUNCEMENT, SET_POST_LIST } from "./types";

export const createAnnouncement = (content) => (dispatch) => {
    axios
        .post("/api/announcements/create", content)
        .then((res) => {
            console.log(res.status);
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
              })  
        });
}

export function getAnnouncements() {
    return function (dispatch) {
        axios
        .get("/api/announcements")
        .then((announcement) => {
            dispatch({
                type: SET_ANNOUNCEMENT,
                payload: announcement,
            })
        })
        .catch((err) => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response,
            })
        );
    }
}

export const createPost = (content) => (dispatch) => {
    axios
        .post("/api/posts/create", content)
        .then((res) => {
            console.log(res.status);
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        })
}

export function getPosts() {
    return function (dispatch) {
        axios  
            .get("/api/posts")
            .then((posts) => {
                dispatch({
                    type: SET_POST_LIST,
                    payload: posts,
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response,
                })
            })
    }
}

export const createEvent = (event) => (dispatch) => {
    console.log(event);
    axios
        .post("/api/events/create", event)
        .then((res) => {
            console.log(res.status);
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        })
}