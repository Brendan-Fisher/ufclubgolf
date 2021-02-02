import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutMember } from "../../redux/actions/authActions";

class MemberDash extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutMember();
    };

    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {this.props.auth.user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{ fontFamily: "monospace" }}>UF Club Golf's</span> website 👏
                            </p>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

MemberDash.propTypes = {
    logoutMember: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutMember }
)(MemberDash);