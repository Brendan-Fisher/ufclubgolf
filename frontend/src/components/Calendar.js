import React, { Component } from "react";


class Calendar extends Component {
    render() {
        return (
            <div id="container" className="container valign-wrapper">
                <div id="content" className="row">
                    <div id="box" className="col s12 center-align">
                        <h4>
                            Welcome to the <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b> Calendar Page</span>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;