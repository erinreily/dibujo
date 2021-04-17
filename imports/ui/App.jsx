import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Week } from './components/weeklySpread/Week.jsx';
import { Navbar } from './components/common/Navbar.jsx';

export const App = () => {

  const logout = () => Meteor.logout();
  const user = useTracker(() => Meteor.user());

  return (
    <main>
      <div className="app">
        <Navbar user={user} />

        <div className="main">

          {user ? (
          <Fragment>
            <Week />
          </Fragment>
          ) : (
            <LoginForm />
          )}

        </div>
      </div>
    </main>
  );
};
