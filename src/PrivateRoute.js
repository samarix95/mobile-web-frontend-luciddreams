import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAuth } from "./reducers/authReducer";
import historyPath from "./historyPath";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={
            props => auth
                ? <Component {...props} />
                : <Redirect to={historyPath.Sign} />
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        auth: getAuth(store)
    }
};

export default connect(
    mapStateToProps,
    null
)(PrivateRoute);