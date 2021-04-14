import axios from "axios";
import { GET_ERRORS, SET_ANNOUNCEMENT, SET_POST_LIST, SET_EVENT_LIST } from "./types";

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

export async function getPosts() {
    return axios  
            .get("/api/posts")
            .then((posts) => {
                return posts;
            })
}

export async function getPost(id) {
    let postID = {
        _id: id
    }

    return axios
        .post("/api/posts/find", postID)
        .then((post) => {
            return post;
        })
        .catch((err) => {
            console.log(err);
        })
}

export const createEvent = (event) => (dispatch) => {
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

export function getPostList(){
    return function (dispatch) {
        axios
            .get("/api/posts")
            .then((posts) => {
                dispatch({
                    type: SET_POST_LIST,
                    payload: posts,
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

export function getEventList(){
    return function (dispatch) {
        axios
            .get("/api/events")
            .then((posts) => {
                dispatch({
                    type: SET_EVENT_LIST,
                    payload: posts,
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

export async function getEvent(id) {
    let eventID = {
        _id: id
    }

    return axios
        .post("/api/events/find", eventID)
        .then((event) => {
            return event;
        })
        .catch((err) => {
            console.log(err);
        })
}

export function deletePost(post) {
    return function (dispatch) {
        axios
            .post("/api/posts", post)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                })
            );
    };
}

export function deleteEvent(event) {
    return function (dispatch) {
        axios
            .post("/api/events", event)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                })
            );
    };
}

export const massEmail = (content, members) => (dispatch) => {
    var email = {
        content: content,
        members: members,
    }
    axios
        .post("/api/email/all", email)
        .then((res) => {
            console.log(res.status)
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err,
            })
        })
}

