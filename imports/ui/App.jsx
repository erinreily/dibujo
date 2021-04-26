import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Header } from './components/Header.jsx';
import { Main } from './components/Main.jsx';

export const App = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};