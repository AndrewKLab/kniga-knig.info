import React from 'react';
import { connect } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
    element?: React.ReactElement
    className?: string;
}

const PrivateRoute = ({element, user}) => {
    return localStorage.getItem('token') && user ? element : <Navigate to={'/login'} replace />
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {user};
}
const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export { connectedPrivateRoute as PrivateRoute };
