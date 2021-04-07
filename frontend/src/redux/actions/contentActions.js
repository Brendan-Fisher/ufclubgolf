import axios from "axios";
import { GET_ERRORS, SET_ANNOUNCEMENT } from "./types";

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