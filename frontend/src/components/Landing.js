import React, { Component } from "react";


class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            Welcome to <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b></span>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;