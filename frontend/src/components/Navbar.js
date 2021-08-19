import './styles/Navbar.css'

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../redux/store"
import { logoutMember } from "../redux/actions/authActions";
import { Divider } from "react-materialize";

import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, { draggable: true, edge: 'right' });

        let profileDropdown = document.querySelector('.profile-trigger');
        M.Dropdown.init(profileDropdown, { hover: false, coverTrigger: false });
        
        let clubDropdown = document.querySelector('.club-trigger');
        M.Dropdown.init(clubDropdown, { hover: false, coverTrigger: false });

        let eventDropdown = document.querySelector('.event-trigger');
        M.Dropdown.init(eventDropdown, { hover: false, coverTrigger: false });
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutMember();
    };
    render() {
        let loggedIn = store.getState().auth.isAuthenticated;
        let memberType = store.getState().auth.memberType;

        return (
            <div className="navbar-wrap">
                <div className="container">
                    <nav className="navbar">
                        <a className="navbar-brand" href="/"><img alt="Florida Club Golf"></img></a>
                        <div className="navbar-collapse">
                            <ul id="nav-mobile" className="hide-on-med-and-down right">
                                <li>
                                    <a href="#!" data-target="club-dropdown" className="dropdown-toggle nav-item club-trigger hide-on-med-and-down">Club</a>
                                    <ul id='club-dropdown' className='dropdown-content'>
                                        <li><a href="/about">Officers</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#!" data-target="event-dropdown" className="dropdown-toggle nav-item event-trigger hide-on-med-and-down">Events</a>
                                    <ul id="event-dropdown" className="dropdown-content">
                                        <li><a href="/calendar">Calendar</a></li>
                                    </ul>
                                </li>
                                <li><a href="/posts" className="nav-item">Posts</a></li>
                                <li><a href="/contact" className="nav-item">Contact</a></li>
                                <li>
                                    <a href="#!" data-target="profile-dropdown" className="nav-item profile-trigger"><i class="material-icons">person</i></a>
                                    <ul id='profile-dropdown' class='dropdown-content'>
                                        {!loggedIn &&
                                            <li><a href="/register">Join the Club!</a></li>
                                        }
                                        {!loggedIn &&
                                            <li><a href="/login">Log In</a></li>
                                        }
                                        {loggedIn &&  memberType !== "pending" && memberType !== "member" && 
                                            <li><a href="/dashboard/exec">User Dashboard</a></li>
                                        }
                                        {loggedIn && 
                                            <li><a href="/" onClick={this.onLogoutClick}>Log Out</a></li>
                                        }
                                    </ul>
                                </li>
                            </ul>       
                        </div>  
                        <a href="/" data-target="slide-out" className="sidenav-trigger hide-on-large right"><i className="material-icons">menu</i></a> 
                    </nav>
                </div>
                <div>
                    <ul id="slide-out" className="sidenav sidenav-trigger">
                        <li><a href="/" className="nav-item">Home</a></li>
                        <li><a href="/about" className="nav-item">About</a></li>
                        <li><a href="/calendar" className="nav-item">Calendar</a></li>
                        <li><a href="/tournaments" className="nav-item">Tournaments</a></li>
                        <li><a href="/posts" className="nav-item">Posts</a></li>
                        <Divider />
                        {loggedIn && memberType !== "pending" && memberType !== "member" &&
                            <li><a href="/dashboard/exec" className="nav-item">User Dashboard</a></li>
                        }
                        {!loggedIn && 
                            <li><a href="/register" className="nav-item">Register</a></li>
                        }
                        {loggedIn ? 
                        <li><a href="/" onClick={this.onLogoutClick} className="nav-item">Log out</a></li>
                        :
                        <li><a href="/login" className="nav-item">Log in</a></li>
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