import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { UsernamePasswordForm } from '/imports/ui/components/authentication/UsernamePasswordForm.jsx';
import { Redirect } from 'react-router-dom';

export const Login = () => {

    const [redirect, setRedirect] = useState('');

    const submitAction = (username, password) => {
        Meteor.loginWithPassword(username, password);

        setRedirect("/");
    };

    return (
        <div>
            <h1>Log in</h1>
            <UsernamePasswordForm submitAction={ submitAction } type="login" buttonText="Log in" />
            { redirect && (
                <Redirect to={ redirect } />
            )}
        </div>
    );
}