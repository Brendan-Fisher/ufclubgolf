import React, { Component } from "react";


class History extends Component {
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                    <div className="header-text-wrap">
                        <div className="header-text">
                            <h1>Learn More About the UF Club Golf</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <h1 className="page-title">Club History</h1>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default History;