import "./styles/AdminDash.css";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser
} from "../redux/actions/userActions";
import {
  createAnnouncement,
  getPostList,
  getEventList,
  getTournamentList,
} from "../redux/actions/contentActions";
import { logoutMember } from "../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import { MemberList } from "./features/MemberList";
import PostEditor  from "./features/PostEditor";
import EventEditor from "./features/EventEditor";
import TournamentEditor from "./features/TournamentEditor";
import ContentList from "./features/ContentList";

import M from 'materialize-css/dist/js/materialize.min.js';


class AdminDash extends Component {
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

  onPromoteClick = (user) => {
    this.props.promoteUser(user);
    this.props.getUsers();
  };

  onDemoteClick = (user) => {
    this.props.demoteUser(user);
    this.props.getUsers();
  };

  onDeleteClick = (user) => {
    this.props.deleteUser(user);
    this.props.getUsers();
  }

  onAnnouncementPost = e => {
    e.preventDefault();
    const content = this.state;
    this.props.createAnnouncement(content);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSelectCategory = (cat) => {
    console.log(cat);
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
    }
  }

  componentDidMount() {
    let collapsible = document.querySelector('.collapsible');
    M.Collapsible.init(collapsible, { accordion: true });

    this.props.getUsers();
    this.props.getPostList();
    this.props.getEventList();
    this.props.getTournamentList();
  }

  render() {
    if (this.props.memberType !== "admin") {
      return <Redirect to={"/dashboard/" + this.props.memberType} />;
    } else {
      return (
        <div id="container" className="container">
          <div id="content" className="section">
            <div className="flexbox">
              <div className="col s12 contentFunctions">
                <ul className="collapsible popout">
                  <li>
                    <div className="collapsible-header green lighten-2"><i className="material-icons">person</i><b>Member List</b></div>
                    <div className="collapsible-body memberList blue lighten-4 ">
                    <MemberList id="memberList"
                      promoteUser={this.onPromoteClick}
                      demoteUser={this.onDemoteClick}
                      deleteUser={this.onDeleteClick}
                    />
                    </div>
                  </li>
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
                      <header>Posts will show up on the home page and be emailed to all registered members</header>
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
                    <div className="collapsible-body blue lighten-4">
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

////<CreateAnnouncement createAnnouncement={this.onAnnouncementPost}/>

AdminDash.propTypes = {
  createAnnouncement: PropTypes.func.isRequired,
  getPostList: PropTypes.func.isRequired,
  getEventList: PropTypes.func.isRequired,
  getTournamentList: PropTypes.func.isRequired,
  logoutMember: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  promoteUser: PropTypes.func.isRequired,
  demoteUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
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
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser,
  createAnnouncement,
  getPostList,
  getEventList,
  getTournamentList,
})(AdminDash);
