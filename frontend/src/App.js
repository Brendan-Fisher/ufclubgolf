import "./App.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentMember, logoutMember } from "./redux/actions/authActions";

import { Provider } from "react-redux";
import store from "./redux/store";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Calendar from "./components/Calendar";
import Tournaments from "./components/Tournaments";
import Posts from "./components/PostsPage";
import Register from "./components/auth/Register";
import About from "./components/About";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ExecDash from "./components/ExecDash";
import AdminDash from "./components/AdminDash";
import MemberDash from "./components/MemberDash";
import Post from "./components/Post";
import Event from "./components/Event";

import M from 'materialize-css/dist/js/materialize.min.js';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentMember(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutMember());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  componentDidMount(){
    let fab = document.querySelector('.fixed-action-btn');
    M.FloatingActionButton.init(fab);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="fixed-action-btn">
              <a href="!#" className="btn-floating btn-large orange darken-2">
                <i className="large material-icons">menu</i>
              </a>
              <ul>
                <li><a rel="noopener noreferrer" href="https://www.facebook.com/groups/uf.club.golf" className="btn-floating blue"><i className="large fab fa-facebook fa-5x"></i></a></li>
                <li><a rel="noopener noreferrer" href="https://twitter.com/UFClubGolf" className="btn-floating green"><i className="large fab fa-twitter fa-5x"></i></a></li>
                <li><a rel="noopener noreferrer" href="https://twitter.com/UFClubGolf" className="btn-floating red"><i className="large far fa-comment-alt"></i></a></li>
              </ul>
            </div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/tournaments" component={Tournaments} />
            <Route exact path="/about" component={About} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:id" component={Post} />
            <Route exact path="/events/:id" component={Event} />
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard/member"
                component={MemberDash}
              />
              <PrivateRoute exact path="/dashboard/admin" component={AdminDash} />
              <PrivateRoute exact path="/dashboard/exec" component={ExecDash} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
