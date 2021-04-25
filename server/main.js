import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import '/imports/api/eventsMethods';
import '/imports/api/eventsPublications';
import { WebApp } from 'meteor/webapp';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(() => {
  WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
});
