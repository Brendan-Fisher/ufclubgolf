import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from '../../redux/store'

const PrivateRoute = ({ component: Component, auth, ...rest }) => 
    (
        <Route
            {...rest}
            render={props => {
                let memType = store.getState().auth.memberType;
                return (
                    auth.isAuthenticated === true ? (
                        <Component {...props} memberType={memType} />
                    ) : (
                        <Redirect to="/login" />
                    )
                )            
                }    
            }
        />
    )
;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);