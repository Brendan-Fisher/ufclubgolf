import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './styles/Landing.css';

import M from 'materialize-css/dist/js/materialize.min.js';
import ImageSlider from "./features/ImageSlider";
import Announcement from "./features/Announcement";
import { getAnnouncements } from "../redux/actions/contentActions";


class Landing extends Component {
    componentDidMount() {
        let carousel = document.querySelector('.carousel');
        M.Carousel.init(carousel, { fullWidth: true, indicators: true });

        this.props.getAnnouncements()
    }
        
    render() {
        return (
            <div>
                <ImageSlider />
                <div style={{backgroundColor: '#66BB6B', width:"100%", height:50}}></div>
                <div id="container" className="container valign-wrapper">
                  <div id="content" className="row">
                    <div className="flexbox">
                      <div id="box" className="col s12 l12 m12 center-align">
                        <Announcement />
                      </div>
                      <div id="box" className="col s12 m4 l4 center-align">
                        <div className="carousel carousel-slider">
                          <div className="carousel-item green lighten-3 black-text" href="#one!">
                            <h2>Pretend this is the Events slider</h2>
                            <h5>Carousel can contain upcoming events and the information about them as well as a direct link to more inforamtion about the event on the events page</h5>
                          </div>
                          <div className="carousel-item green lighten-3 black-text" href="#two!">
                            <h2>Second Panel</h2>
                            <p className="black-text">This is your second panel</p>
                          </div>
                          <div className="carousel-item green lighten-3 black-text" href="#three!">
                            <h2>Third Panel</h2>
                            <p className="black-text">This is your third panel</p>
                          </div>
                          <div className="carousel-item green lighten-3 black-text" href="#four!">
                            <h2>Fourth Panel</h2>
                            <p className="black-text">This is your fourth panel</p>
                          </div>
                        </div>                        
                      </div>
                      <div id="box" style={{ minHeight: "400px" }}className="col s12 m7 l7 center-align">
                        <h5>Recent Club Posts</h5>
                        <table>
                          <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                          </tr>
                          </thead>

                          <tbody>
                          <tr>
                            <td>Recent tournament results</td>
                            <td>Tournaments</td>
                            <td>03/22/21</td>
                          </tr>
                          <tr>
                            <td>Get to know your Club officers</td>
                            <td>Information</td>
                            <td>03/21/21</td>
                          </tr>
                          </tbody>
                        </table>
                        <h5>
                          This table can be used to list recent posts made by the club board members. 
                          Posts may be about recent tournament results, information about the club, etc.
                        </h5>
                      </div>
                      <div id="box" className="col s12 center-align">
                        <h2>Calendar</h2>
                        <h5>This section will be used for visitors to see a calendar view of upcoming club 
                            events, whether it be upcoming club meetings, practices, tournaments or 
                            other events. It will be tied directly to the UF Club Golf google calendar so 
                            that anyone with access can create events on the calendar that will be reflected 
                            in real time on the website.
                        </h5>
                        <div className="lg-calendar"><iframe className="calendar" title="UF Club Golf Calendar Large" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23b5d9ff&amp;ctz=America%2FNew_York&amp;src=Z2F0b3JzY2x1YmdvbGZAZ21haWwuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe></div>
                        <div className="sm-calendar"><iframe className="calendar" title="UF Club Golf Calendar Small" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23b5d9ff&amp;ctz=America%2FNew_York&amp;src=Z2F0b3JzY2x1YmdvbGZAZ21haWwuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;mode=AGENDA"></iframe></div>                        
                      </div>
                  </div>
                </div>
              </div>
            </div>    
        );
    }
}

Landing.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  getAnnouncements
})(Landing);