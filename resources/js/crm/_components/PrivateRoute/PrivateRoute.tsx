import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../UI';
import { ArrowLeftIcon } from '../UI/Icons';

export interface PrivateRouteProps {
    element?: React.ReactElement;
    backButton?: boolean;
    className?: string;
}

const PrivateRoute = ({ element, backButton, user }) => {
    let navigate = useNavigate();
    return localStorage.getItem('token') && user ? <React.Fragment>
        {backButton && <Button className="back_button w-auto mb-3" onClick={() => navigate(-1)}><ArrowLeftIcon size={25} color={'rgba(255,255,255,1)'} />Назад</Button>}
        {element}
    </React.Fragment> : <Navigate to={'/login'} replace />
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export { connectedPrivateRoute as PrivateRoute };
