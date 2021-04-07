import React, { Component } from "react";
import store from "../../redux/store";

class Announcement extends Component {
    render() {
        var announcement = store.getState().content.announcement
        return (
            <div>
                <h2>{announcement}</h2>
            </div>
        )
    }
}

export default Announcement;