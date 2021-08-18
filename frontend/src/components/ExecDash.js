import "./styles/AdminDash.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createAnnouncement,
  getPostList,
  getEventList,
  getTournamentList,
} from "../redux/actions/contentActions";
import { logoutMember } from "../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import PostEditor  from "./features/PostEditor";
import EventEditor from "./features/EventEditor";
import TournamentEditor from "./features/TournamentEditor";
import ContentList from "./features/ContentList";

import M from 'materialize-css/dist/js/materialize.min.js';


class ExecDash extends Component {
    constructor(){
      super();
      this.state = {
          announcement: "",
          category: "",
          editor: <div></div>
      }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutMember();
  };

  onAnnouncementPost = e => {
    e.preventDefault();
    const content = this.state;
    this.props.createAnnouncement(content);
    
    this.setState({
      announcement: "",
    })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSelectCategory = (cat) => {
    this.setState({ category: cat }, () => this.switchEditor())
  }

  switchEditor() {
    switch(this.state.category){
      case "post":
        this.setState({ editor: <PostEditor /> });
        break;
      case "event":
        this.setState({ editor: <EventEditor /> });
        break;
      case "tournament":
        this.setState({ editor: <TournamentEditor /> });
        break;
      default: 
        break;
    }
  }

  componentDidMount() {
    let collapsible = document.querySelector('.collapsible');
    M.Collapsible.init(collapsible, { accordion: true });

    this.props.getPostList();
    this.props.getEventList();
    this.props.getTournamentList();
  }

  render() {
    if (this.props.memberType !== "exec") {
      return <Redirect to={"/dashboard/" + this.props.memberType} />;
    } else {
      return (
        <div id="container" className="container">
          <div id="content" className="section">
            <div className="flexbox">
              <div id="box" className="col s12 center-align" >
                <h4>
                    Welcome to the <span style={{ fontFamily: "monospace" }}>Exec Dashboard</span>
                </h4>
                <h5><span style={{fontFamily: "monospace" }}>Here you can update content including posts, events, announcements, and tournament results</span></h5>
              </div>
              <div className="col s12 contentFunctions">
                <ul className="collapsible popout">
                  <li>
                    <div className="collapsible-header green lighten-2"><i className="material-icons">announcement</i><b>Update Home Page Announcement</b></div>
                    <div className="collapsible-body blue lighten-4">
                      <form noValidate onSubmit={this.onAnnouncementPost}>
                        <div className="input-field">
                          <label>New Announcement</label>
                          <input 
                            style={{color:"black"}}
                            onChange={this.onChange} 
                            value={this.state.announcement}
                            type="text"
                            id="announcement" />
                        </div>
                        <div className="col s12">
                          <button style={{
                              width: "150px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              margin: "11.250px"
                          }} className="btn btn-medium waves-effect waves-green hoverable blue accent-3" >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header green lighten-2"><i className="material-icons">forum</i><b>Create Post/Event/Tournament</b></div>
                    <div className="collapsible-body post-editor blue lighten-4">
                      <label>Select content type</label>
                      <br/>
                      <ul>
                        <li><button className="btn btn-medium waves-effect waves-green hoverable orange lighten-2" style={{borderRadius: "3px",letterSpacing: "1.5px",margin: "4px",padding:"4px"}} onClick={() => this.onSelectCategory("post")}>General Post</button></li>
                        <li><button className="btn btn-medium waves-effect waves-green hoverable orange lighten-2" style={{borderRadius: "3px",letterSpacing: "1.5px",margin: "4px",padding:"4px"}} onClick={() => this.onSelectCategory("event")}>New Event</button></li>
                        <li><button className="btn btn-medium waves-effect waves-green hoverable orange lighten-2" style={{borderRadius: "3px",letterSpacing: "1.5px",margin: "4px",padding:"4px"}} onClick={() => this.onSelectCategory("tournament")}>Tournament Results</button></li>
                      </ul>
                      {this.state.editor}
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header green lighten-2"><i className="material-icons">delete_sweep</i><b>Delete Content</b></div>
                    <div className="contentList collapsible-body blue lighten-4">
                      <ContentList />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

ExecDash.propTypes = {
  createAnnouncement: PropTypes.func.isRequired,
  getPostList: PropTypes.func.isRequired,
  getEventList: PropTypes.func.isRequired,
  getTournamentList: PropTypes.func.isRequired,
  logoutMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  content: state.content,
});

export default connect(mapStateToProps, {
  logoutMember,
  createAnnouncement,
  getPostList,
  getEventList,
  getTournamentList,
})(ExecDash);
