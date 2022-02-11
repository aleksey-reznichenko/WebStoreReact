import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import {actionMyRoute} from "../reducers/RouteReducer";

const RRoute = ({action, component: Component, ...routeProps}) => {
    const WrapperComponent = (componentProps) => {
        action(componentProps.match)
        return <Component {...componentProps}/>
    }
    return <Route {...routeProps} component={WrapperComponent}/>
}

export const CRRoute = connect(null,
    {action: actionMyRoute})(RRoute)

const ProtectedRoute =({ fallback='/',
                         roles=['admin'],
                         auth,
                         component: Component,
                         ...routeProps}) => {
    const WrapperComponent = (componentProps) => {
        const acl = auth?.payload?.sub?.acl || ['anon']
        const unity = roles.some(item => acl.includes(item))
        return(
            unity ?
                <Component {...componentProps} />
                :
                <Redirect to="/my-account" />
        )
    };
    return <CRRoute {...routeProps} component={WrapperComponent} />;
}
export const CPRoute = connect(state => ({auth: state.auth}))(ProtectedRoute)
