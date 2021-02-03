import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutMember } from "../../redux/actions/authActions";
import { Redirect } from "react-router-dom";

class AdminDash extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutMember();
    };

    render() {
        if(this.props.memberType !== "admin"){
            console.log(this.props.memberType + " printed from AdminDash")
            return (
                <Redirect to={ "/dashboard/" + this.props.memberType }/>
            )
        }
        else {
            return (
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey there,</b> {this.props.auth.user.name.split(" ")[0]}
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into{" "}
                                    <span style={{ fontFamily: "monospace" }}>UF Club Golf's</span> website as an Admin
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

AdminDash.propTypes = {
    logoutMember: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutMember }
)(AdminDash);