import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { UsernamePasswordForm } from '/imports/ui/components/authentication/UsernamePasswordForm.jsx';
import { Redirect } from 'react-router-dom';

export const CreateAccount = () => {

    const [redirect, setRedirect] = useState('');

    const submitAction = (username, password, name) => Accounts.createUser({
        username: username,
        password: password,
        profile: {
            name: name
        }
    },
    (e) => {
        if (e) {
            console.log("error: " + e.reason);
        } else {
            setRedirect("/");
        };
    });

    return (
        <div className="pl-16 pt-2 pb-16">
            <h1>Register</h1>
            <UsernamePasswordForm submitAction={ submitAction } type="createAccount" buttonText="Create account" />
            { redirect && (
                <Redirect to={ redirect } />
            )}
        </div>
    );
}