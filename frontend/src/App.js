import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentMember, logoutMember } from "./redux/actions/authActions";

import { Provider } from "react-redux";
import store from "./redux/store"

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ExecDash from './components/dashboards/ExecDash';
import AdminDash from './components/dashboards/AdminDash'

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
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutMember());

    // Redirect to login
    window.location.href = "./login";
  }
}



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard/admin" component={AdminDash} />
            <PrivateRoute exact path="/dashboard/exec" component={ExecDash} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
