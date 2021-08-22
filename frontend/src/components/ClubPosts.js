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
                            <h1>See What We've Posted Recently</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row home-content">
                            <div className="col s12 home-box" style={{marginBottom: "2rem"}}>
                                <h3 className="page-title">Don't forget to check us out on our social medias for updated club information!</h3> 
                                <a href="https://www.facebook.com/groups/uf.club.golf/"><i className="fab fa-facebook-square"></i></a>
                                <a href="https://twitter.com/UFClubGolf"><i className="fab fa-twitter-square"></i></a>
                            </div>
                            
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