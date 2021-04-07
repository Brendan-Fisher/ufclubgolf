import React, { Component } from "react";


class Calendar extends Component {
    render() {
        return (
            <div id="container" className="container valign-wrapper">
                <div id="content" className="row">
                    <div className="flexbox">
                        <div id="box" className="col s12 center-align">
                            <h4>
                                Welcome to the <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b> Calendar Page</span>
                                <div className="lg-calendar"><iframe className="calendar" title="UF Club Golf Calendar Large" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23b5d9ff&amp;ctz=America%2FNew_York&amp;src=Z2F0b3JzY2x1YmdvbGZAZ21haWwuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe></div>
                                <div className="sm-calendar"><iframe className="calendar" title="UF Club Golf Calendar Small" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23b5d9ff&amp;ctz=America%2FNew_York&amp;src=Z2F0b3JzY2x1YmdvbGZAZ21haWwuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;mode=AGENDA"></iframe></div> 
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;