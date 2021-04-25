import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { EventsCollection } from '/imports/db/EventsCollection';
import '/imports/api/eventsPublications';

if (Meteor.isServer) {
  describe('Events', () => {
    describe('methods', () => {
        const userId = Random.id();
        let eventId;

        beforeEach(() => {
            EventsCollection.remove({});
            eventId = EventsCollection.insert({
                text: 'Test Event',
                date: '01012021',
                createdAt: new Date(),
                userId
            });
        });

        // //*how to invoke meteor.publish?
        // it('should return the events collection for the user id', () => {
        //     const events = Meteor.server.publish_handlers.EventsCollection.apply(context, "events");
        //     assert.equal(events.length, 1);
        // });
    });
  });
}