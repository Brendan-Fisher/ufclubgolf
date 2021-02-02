import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginMember } from "../../redux/actions/authActions";
import classnames from "classnames";
import PrivateRoute from "../private-route/PrivateRoute";
import AdminDash from "../dashboards/AdminDash"

class Login extends Component {
    constructor() {
        super();
        this.state = {
        email: "",
        password: "",
        memberType: "",
        errors: {}
        };
    }

    componentDidMount() {
        // If logged in user navigates to Login page, redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard/" + this.props.auth.memberType);
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated) {
            let memType = nextProps.auth.memberType;

            if (memType === "admin") {
                this.props.history.push("/dashboard/admin"); // Push user to dashboard when they log in
            }
            else if (memType === "exec"){
                this.props.history.push("/dashboard/exec"); // Push user to dashboard when they log in
            }
            else this.props.history.push("/dashboard/member"); // Push user to dashboard when they log in
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    
    onSubmit = e => {
        e.preventDefault();
        const memberData = {
            email: this.state.email,
            password: this.state.password,
        };
        // Since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        this.props.loginMember(memberData); 
    };

    render() {
        const { errors } = this.state;

        return(
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Log in</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginMember: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { loginMember }
)(Login);