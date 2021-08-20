import React, { Component } from "react";

import FullEventList from "./features/FullEventList";


class ClubPosts extends Component {
    render() {

        return (
            <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                    <div className="header-text-wrap">
                        <div className="header-text">
                            <h1>See What the Club has Posted Recently</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row home-content">
                           <div className="col s12 m6 home-box">
                                <h2>Tournament Results</h2>
                                <div className="tournaments">
                                </div>
                            </div>
                            <div className="col s12 m6 home-box">
                                <h2>Posts</h2>
                                <div className="posts">
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}


export default ClubPosts;