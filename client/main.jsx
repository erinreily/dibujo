import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { AppWrapper as App } from '/imports/ui/AppWrapper';

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
