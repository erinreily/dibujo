import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import '/imports/api/eventsMethods';
import '/imports/api/eventsPublications';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));
});
