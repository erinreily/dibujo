import { check } from 'meteor/check';
import { EventsCollection } from '../db/EventsCollection';

Meteor.methods({
    'events.insert'(text, date) {
        check(text, String);
        check(date, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        EventsCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
            date: date
        })
    },

    'events.remove'(eventId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const event =  EventsCollection.findOne({ _id: eventId, userId: this.userId});

        if (!event) {
            throw new Meteor.Error('Access denied.');
        }
       
        EventsCollection.remove(eventId);
    }
});