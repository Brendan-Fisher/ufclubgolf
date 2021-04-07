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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
        number: "",
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            number: this.state.number,
        };
        this.props.registerMember(newMember, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div id="container"  className="container">
                <div id="content" style={{ marginTop: "4rem"}} className="row">
                    <div className="flexbox">
                        <div id="box" className="col s10 m8 l8 offset-s1 offset-m2 offset-l2">
                            <Link to="/" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> 
                                <a><text id="pass2">Back to home</text></a>
                            </Link>

                            <div className="col s12" style={{ paddingLeft: "11.250px"} }>
                                <h4><b>Register</b> below</h4>
                                <p className="grey-text text-darken-1">
                                    Already have an account? <Link to="/login">
                                    <a><text id="pass4">Log In</text></a></Link>
                                    <br></br>
                                    Or <Link to="/" onClick={this.guestLogin}>
                                    <a><text id="pass4">Continue As Guest</text></a></Link>
                                </p>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input  
                                        onChange={this.onChange}
                                        value={this.state.firstname}
                                        error={errors.firstname}
                                        id="firstname"
                                        type="text"
                                        className={classnames("",{ invalid: errors.firstname })}
                                    />
                                    <label htmlFor="firstname">First Name</label>
                                    <span className="red-text">{errors.firstname}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input  
                                        onChange={this.onChange}
                                        value={this.state.lastname}
                                        error={errors.lastname}
                                        id="lastname"
                                        type="text"
                                        className={classnames("",{ invalid: errors.lastname })}
                                    />
                                    <label htmlFor="lastname">Last Name</label>
                                    <span className="red-text">{errors.lastname}</span>
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
                                <div className="input-field col s12">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.facebook}
                                    error={errors.facebook}
                                    id="facebook"
                                    type="text"
                                    optional
                                    className={classnames("",{ invalid: errors.facebook })}
                                    />
                                    <label htmlFor="facebook">Facebook Username (Optional)</label>
                                    <span className="red-text">{errors.facebook}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.number}
                                    error={errors.number}
                                    id="number"
                                    type="text"  
                                    className={classnames("",{ invalid: errors.number })}
                                    />
                                    <label htmlFor="number">Phone Number</label>
                                    <span className="red-text">{errors.number}</span>
                                </div>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                        style={{
                                            width: "75px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            margin: "11.250px",
                                        }}
                                        type="submit"
                                        className="btn btn-medium waves-effect waves-green hoverable blue accent-3"
                                    >
                                        <text id="location" class="join" id="pass3">Sign Up</text>
                                    </button>
                                </div>
                            </form>
                        </div>
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