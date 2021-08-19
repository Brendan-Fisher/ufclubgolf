import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './styles/Landing.css';

import ImageSlider from "./features/ImageSlider";
import Announcement from "./features/Announcement";
import { getAnnouncements, getPostList, getEventList } from "../redux/actions/contentActions";
import PostsTable from "./features/PostsTable";
import CarouselPanel from "./features/CarouselPanel";
import store from "../redux/store";


class Landing extends Component {
    componentDidMount() {
        this.props.getAnnouncements();
        this.props.getPostList();
        this.props.getEventList();

       // console.log(store.getState().content);
    }
        
    render() {
        return (
            <div className="main-wrap">
                <div className="carousel-wrap">
                  <ImageSlider />
                  <div className="carousel-announcement-wrap">
                    <div className="container">
                      <div className="row">
                        <div className="col m6 offset-md-6 l5 offset-lg-8">
                          <div className="carousel-announcement">
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
                    <div id="content" className="row">
                      <div className="flexbox">
                          <CarouselPanel />
                        <div id="box" style={{ minHeight: "400px" }}className="col s12 m6 l6 center-align">
                          <PostsTable />
                        </div>
                        <div id="box" className="col s12 center-align">
                          <h4>Club Calendar</h4>
                          <div className="lg-calendar"><iframe className="calendar" title="UF Club Golf Calendar Large" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%237986CB&amp;showTitle=0&amp;showNav=1&amp;mode=WEEK"></iframe></div>
                          <div className="sm-calendar"><iframe className="calendar" title="UF Club Golf Calendar Small" scrolling="no" frameBorder="0" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%2333B679&amp;ctz=America%2FNew_York&amp;src=ZmxvcmlkYWNsdWJnb2xmdGVhbUBnbWFpbC5jb20&amp;color=%237986CB&amp;showTitle=0&amp;showNav=1&amp;mode=AGENDA"></iframe></div>                       
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