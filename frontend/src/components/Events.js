import React, { Component } from "react";


class Events extends Component {
    render() {
        return (
            <div id="container" className="container valign-wrapper">
                <div id="content" className="row">
                    <div className="flexbox">    
                        <div id="box" className="col s12 center-align">
                            <h4>
                                Welcome to the <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b> Current Events Page</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;