import React, { Component } from "react";
import store from "../../redux/store";

class Announcement extends Component {
    render() {
        var announcement = store.getState().content.announcement
        return (
            <div>
                <h1>{announcement}</h1>
            </div>
        )
    }
}

export default Announcement;