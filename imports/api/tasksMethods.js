import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
    'tasks.insert'(text, date) {
        check(text, String);
        check(date, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
            date: date
        })
    },

    'tasks.remove'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task =  TasksCollection.findOne({ _id: taskId, userId: this.userId});

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }
       
        TasksCollection.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            }
        })
    }
});