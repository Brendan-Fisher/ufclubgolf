import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './styles/Landing.css';

import { getAnnouncements, getPostList, getEventList } from "../redux/actions/contentActions";
import LandingEventList from "./features/LandingEventList";
import store from "../redux/store";

import M from 'materialize-css/dist/js/materialize.min.js';

class Landing extends Component {
    componentDidMount() {
      this.props.getAnnouncements();
      this.props.getPostList();
      this.props.getEventList();

      let slider = document.querySelector('.slider');
      M.Slider.init(slider, {indicators: false, duration: 1500, interval: 5000, height: 'auto' });
    }
        
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                  <div className="header-image"><img id="slide1" alt="Golf Bag Header"></img></div>
                  <div className="header-text-wrap">
                    <div className="header-text header-text-landing">
                        <h1>{store.getState().content.announcement}</h1>
                    </div>
                  </div>
                </div>
                <div className="content-wrap content-wrap-home">
                  <div className="container">
                    <div className="row home-announcement">
                      <div className="col">
                        <aside>
                          <h1>Club Announcement</h1>
                          <h3>{store.getState().content.announcement}</h3>
                        </aside>
                      </div>
                    </div>
                    <div className="row home-content">
                      <div className="col s12 m6 l6 home-box">
                        <div className="home-about">
                          <h2>About the Club</h2>
                          <p>The University of Florida Golf club is a place for players of all skill levels to come together and have a good time playing the great game of golf.</p>
                          <p>
                            <a className="btn indigo darken-4" href="/membership">Membership</a>
                            <a className="btn indigo darken-4" href="/officers">Officers</a>
                            <a className="btn indigo darken-4" href="/history">History</a>
                          </p>
                        </div>
                        
                      </div>
                      <div className="col s12 m6 l6 home-box">
                        <div className="home-events">
                          <h2>Events</h2>
                          <p></p>
                          <LandingEventList />
                        </div>
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
  getPostList: PropTypes.func.isRequired,
  getEventList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  getAnnouncements,
  getPostList,
  getEventList
})(Landing);