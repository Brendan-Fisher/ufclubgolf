import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../redux/store"
import { logoutMember } from "../redux/actions/authActions";

import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, { draggable: true });
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutMember();
    };

      

    render() {
        let loggedIn = store.getState().auth.isAuthenticated;
        let memberType = store.getState().auth.memberType;

        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0 grey darken-1">
                    <div>
                        <a href="/" data-target="slide-out" className="sidenav-trigger hide-on-large left"><i className="material-icons">menu</i></a> 
                        <ul id="nav-mobile" className="hide-on-med-and-down right">
                            {!loggedIn &&
                                <li>
                                    <a 
                                        href="/register" 
                                        className="btn btn-medium waves-effect waves-green hoverable blue accent-3" 
                                        style={{
                                            width: "120px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            margin: "11.250px"
                                        }}
                                    >
                                        Register
                                    </a>
                                </li>
                            }
                            {!loggedIn &&
                                <li>
                                    <a 
                                        href="/login" 
                                        className="btn btn-medium waves-effect hoverable white black-text" 
                                        style={{
                                            width: "120px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            margin: "11.250px"
                                        }}
                                    >
                                        Log in
                                    </a>
                                </li>
                            }
                        </ul>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            {loggedIn && memberType !== "guest" && memberType !== "member" &&
                                <li><a href="/dashboard/exec">User Dashboard</a></li>
                            }
                            {loggedIn && 
                                <li><a href="/" onClick={this.onLogoutClick}>Log out</a></li>
                            }
                        </ul>                     
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace",
                                margin: "auto"
                            }}
                            className="col s12 m6 l3 brand-logo center black-text"
                        >
                            <i className="material-icons">code</i>
                            UF Club Golf
                        </Link>
                    </div>
                </nav>

                <div>
                    <ul id="slide-out" className="sidenav">
                        <li><a href="/">Home</a></li>
                        {loggedIn && memberType !== "guest" && memberType !== "member" &&
                            <li><a href="/dashboard/exec">User Dashboard</a></li>
                        }
                        {!loggedIn && 
                            <li><a href="/register">Register</a></li>
                        }
                        {loggedIn ? 
                        <li><a href="/" onClick={this.onLogoutClick}>Log out</a></li>
                        :
                        <li><a href="/login">Log in</a></li>
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutMember: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutMember }
)(Navbar);