import React, { useReducer } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => console.log(auth.user) || (
  
  <Route
    {...rest}
    render={props => 
      auth.isAuthenticated === true && auth.user.id === "5ebf4e5b66c1d249df4ac341" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
