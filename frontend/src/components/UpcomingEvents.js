import React, { Component } from "react";


class UpcomingEvents extends Component {
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                    <div className="header-text-wrap">
                        <div className="header-text">
                            <h1>See What Events are Coming Up</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <h1 className="page-title">Upcoming Club Events</h1>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default UpcomingEvents;