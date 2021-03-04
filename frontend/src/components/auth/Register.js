import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerMember, loginMember } from "../../redux/actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard/" + this.props.auth.memberType);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated) {
            let memType = props.auth.memberType;

            if (memType === "admin") {
                props.history.push("/dashboard/admin"); // Push user to dashboard when they log in
            }
            else if (memType === "exec"){
                props.history.push("/dashboard/exec"); // Push user to dashboard when they log in
            }
            else props.history.push("/"); // Push user to home page when they log in
        }

        if (props.errors) {
            return {
                errors: props.errors
            }
        }
        else return null;
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    guestLogin = e => {
        e.preventDefault();
        const memberData = {
            email: "guest@guest.com",
            password: "guest123",
        };
        // Since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        this.props.loginMember(memberData); 
    }

    onSubmit = e => {
        e.preventDefault();
        const newMember = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerMember(newMember, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s10 m8 l8 offset-s1 offset-m2 offset-l2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>

                        <div className="col s12" style={{ paddingLeft: "11.250px"} }>
                            <h4><b>Register</b> below</h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                                <br></br>
                                Or <Link to="/" onClick={this.guestLogin}>Continue as Guest</Link>
                            </p>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input  
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("",{ invalid: errors.name })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("",{ invalid: errors.email })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("",{ invalid: errors.password })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("",{ invalid: errors.password2 })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
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
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerMember: PropTypes.func.isRequired,
    loginMember: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerMember, loginMember }
)(withRouter(Register));