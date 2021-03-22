import './styles/Navbar.css'

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../redux/store"
import { logoutMember } from "../redux/actions/authActions";
import { Divider, Dropdown } from "react-materialize";

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
                <nav className="z-depth-0 green lighten-1">
                    <div>
                        <a href="/" data-target="slide-out" className="sidenav-trigger hide-on-large left"><i className="material-icons">menu</i></a> 
                        <ul id="nav-mobile" className="hide-on-med-and-down right">
                            {!loggedIn &&
                                <li>
                                    <a 
                                        href="/register" 
                                        className="btn btn-medium waves-effect waves-green hoverable blue accent-3" 
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            margin: "11.250px"
                                        }}
                                    >
                                        Join UF Club Golf
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
                                <Dropdown
                                    id="Dropdown_6"
                                    options={{
                                        alignment: 'right',
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        coverTrigger: false,
                                        hover: true,
                                        inDuration: 150,
                                        outDuration: 250
                                    }}
                                    trigger={<a href="#!"><i className="material-icons">menu</i></a>}
                                    >
                                        <ul>
                                            <li><a href="/events">Events</a></li>
                                            {loggedIn && memberType !== "pending" && memberType !== "member" && <li><a href="/dashboard/exec">User Dashboard</a></li>}
                                            <Divider />
                                            {loggedIn && <li><a href="/" onClick={this.onLogoutClick}>Log out</a></li>}
                                        </ul>
                                    </Dropdown>
                            </li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/calendar">Calendar</a></li>
                            <li><a href="/tournaments">Tournaments</a></li>
                        </ul>                     
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace",
                                margin: "auto"
                            }}
                            className="col s12 m6 l3 brand-logo center white-text"
                        >
                            UF Club Golf
                        </Link>
                    </div>
                </nav>

                <div>
                    <ul id="slide-out" className="sidenav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/calendar">Calendar</a></li>
                        <li><a href="/tournaments">Tournaments</a></li>
                        <li><a href="/events">Events</a></li>
                        {loggedIn && memberType !== "pending" && memberType !== "member" &&
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