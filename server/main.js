import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import { EventsCollection } from '/imports/db/EventsCollection';
import '/imports/api/eventsMethods';
import '/imports/api/eventsPublications';
import { WebApp } from 'meteor/webapp';

const insertTask = (taskText, user) => 
  TasksCollection.insert({ 
    text: taskText,
    userId: user._id,
    createdAt: new Date()
  });

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

  // if (TasksCollection.find().count() === 0) {
  //   [
  //     'First Task',
  //     'Second Task',
  //     'Third Task',
  //     'Fourth Task',
  //     'Fifth Task',
  //     'Sixth Task',
  //     'Seventh Task'
  //   ].forEach(taskText => insertTask(taskText, user));
  // }
});
