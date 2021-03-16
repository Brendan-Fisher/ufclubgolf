import React, { Component } from "react";

import M from 'materialize-css/dist/js/materialize.min.js';


class Landing extends Component {
    componentDidMount() {
        let carousel = document.querySelector('.carousel');
        M.Carousel.init(carousel, { fullWidth: true, indicators: true });
    }
        
    render() {
        return (
            <div id="container" className="container valign-wrapper">
                <div id="content" className="row">
                    <div className="flexbox">
                        <div id="box" className="col s12 l12 m12 center-align">
                                <h4>
                                    Welcome to <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b></span>
                                </h4>
                        </div>
                        <div id="box" className="col s12 l12 m12 center-align">
                            <h4>Hello</h4>
                            <h5>
                                Imagine there is a lot of content here please
                            </h5>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div id="box" className="col s12 m4 l4 center-align">
                            <div className="carousel carousel-slider">
                            <div className="carousel-item muted black-text" href="#one!">
                                <h2>Pretend this is the Events slider</h2>
                            </div>
                            <div className="carousel-item amber white-text" href="#two!">
                                <h2>Second Panel</h2>
                                <p className="white-text">This is your second panel</p>
                            </div>
                            <div className="carousel-item green white-text" href="#three!">
                                <h2>Third Panel</h2>
                                <p className="white-text">This is your third panel</p>
                            </div>
                            <div className="carousel-item blue white-text" href="#four!">
                                <h2>Fourth Panel</h2>
                                <p className="white-text">This is your fourth panel</p>
                            </div>
                            </div>
                            
                        </div>
                        <div id="box" style={{ minHeight: "400px" }}className="col s12 m7 l7 center-align">
                            <h5>Pretend this is the Posts table</h5>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>Alvin</td>
                                    <td>Eclair</td>
                                    <td>$0.87</td>
                                </tr>
                                <tr>
                                    <td>Alan</td>
                                    <td>Jellybean</td>
                                    <td>$3.76</td>
                                </tr>
                                <tr>
                                    <td>Jonathan</td>
                                    <td>Lollipop</td>
                                    <td>$7.00</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div id="box" className="col s12 center-align">
                            <h2>Calendar</h2>
                            <iframe  title="UF Club Golf Calendar" scrolling="no" frameBorder="0" id="calendar" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23b5d9ff&amp;ctz=America%2FNew_York&amp;src=Z2F0b3JzY2x1YmdvbGZAZ21haWwuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe>                        
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default Landing;