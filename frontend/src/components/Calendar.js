import React, { Component } from "react";


class Calendar extends Component {
    render() {
        return (
            <div id="container" className="container valign-wrapper">
                <div id="content" className="row">
                    <div className="flexbox">
                        <div id="box" className="col s12 center-align" >
                            <h4>
                                Welcome to the <span style={{ fontFamily: "monospace" }}>Club Calendar Page</span>
                            </h4>
                            <h5><span style={{fontFamily: "monospace" }}>Here you can view all upcoming club events and meetings in a calendar format</span></h5>
                        </div>
                        <div className="col s12 center-align">
                            <div className="lg-calendar"><iframe className="calendar" title="UF Club Golf Calendar Large" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%237986CB&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe></div>
                            <div className="sm-calendar"><iframe className="calendar" title="UF Club Golf Calendar Small" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%237986CB&amp;showTitle=0&amp;showNav=1&amp;mode=AGENDA"></iframe></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;