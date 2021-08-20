import React, { Component } from "react";


class Calendar extends Component {
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                    <div className="header-text-wrap">
                        <div className="header-text">
                            <h1>Check Out What's Coming Up</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <h1 className="page-title">Calendar</h1>
                            <p>This calendar reflects the official club golf google calendar, events you see on the homepage may not necessarily be reflected on this calendar</p>
                                <div className="col s12 center-align">
                                    <div className="lg-calendar"><iframe className="calendar" title="UF Club Golf Calendar Large" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%21438d&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe></div>
                                    <div className="sm-calendar"><iframe className="calendar" title="UF Club Golf Calendar Small" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%21438d&amp;showTitle=0&amp;showNav=1&amp;mode=AGENDA"></iframe></div>
                                </div>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Calendar;