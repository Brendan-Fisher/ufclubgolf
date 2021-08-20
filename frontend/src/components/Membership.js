import React, { Component } from "react";


class Membership extends Component {
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                    <div className="header-text-wrap">
                        <div className="header-text">
                            <h1>Become Involved in UF Club Golf</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <h1 className="page-title">What it Means to be a Member</h1>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Membership;