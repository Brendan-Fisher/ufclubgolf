import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './styles/Landing.css';

import { getAnnouncements, getPostList, getEventList } from "../redux/actions/contentActions";
import store from "../redux/store";

import M from 'materialize-css/dist/js/materialize.min.js';


class Landing extends Component {
    componentDidMount() {
        this.props.getAnnouncements();
        this.props.getPostList();
        this.props.getEventList();

        let slider = document.querySelector('.slider');
        M.Slider.init(slider, {indicators: false, duration: 1500, interval: 5000, height: 'auto' });

       // console.log(store.getState().content);
    }
        
    render() {
        return (
            <div className="main-wrap">
                <div className="header-wrap">
                  <div className="header-image"><img id="slide1" alt="Golf Bag Header Image"></img></div>
                  <div className="header-announcement-wrap">
                    <div className="container">
                      <div className="row">
                        <div className="col m6 offset-md-6 l5 offset-lg-8">
                          <div className="header-announcement">
                            <hr />
                            <h3>{store.getState().content.announcement}</h3>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-wrap content-wrap-home">
                  <div className="container">

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