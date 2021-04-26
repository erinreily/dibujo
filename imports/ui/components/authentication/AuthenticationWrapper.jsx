import React from 'react';
import { Login } from "/imports/ui/components/authentication/Login.jsx";
import { CreateAccount } from "/imports/ui/components/authentication/CreateAccount.jsx";
import { Switch, Route, Link, useLocation } from "react-router-dom";

export const AuthenticationWrapper = (props) => {

    let location = useLocation();

    return (
        <div id="authentication-wrapper" className="m-16">
            <Switch>
                <Route exact path='/' component={ Login }/>
                <Route exact path='/authentication' component={ Login }/>
                <Route path='/authentication/login' component={ Login }/>
                <Route path='/authentication/createaccount' component={ CreateAccount }/>
            </Switch>

            { location.pathname !== '/authentication/createaccount' ? (
                <div>
                    <h2>Need to create an account?</h2>
                    <Link to="/authentication/createaccount">Sign up here</Link>
                </div>
            ) : (
                <div>
                    <Link to="/authentication/login">Back to login</Link>
                </div>
            )}
        </div>
    );
}