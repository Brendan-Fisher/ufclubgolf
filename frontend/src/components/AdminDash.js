import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser
} from "../redux/actions/userActions";
import { logoutMember } from "../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import { MemberList } from "../components/features/MemberList";

class AdminDash extends Component {
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

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    if (this.props.memberType !== "admin") {
      return <Redirect to={"/dashboard/" + this.props.memberType} />;
    } else {
      return (
        <div id="container" className="container valign-wrapper">
          <div id="content" className="section">
            <div className="flexbox">
              <div id="box" className="col s6 memberList center-align">
                <MemberList id="memberList"
                  promoteUser={this.onPromoteClick}
                  demoteUser={this.onDemoteClick}
                  deleteUser={this.onDeleteClick}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

AdminDash.propTypes = {
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
});

export default connect(mapStateToProps, {
  logoutMember,
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser
})(AdminDash);
