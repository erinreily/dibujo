import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { EventsCollection } from '/imports/db/EventsCollection';
import '/imports/api/eventsMethods';

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

        afterEach(() => {
            stubs.restoreAll();
        });

        describe('insert event', () => {
            it('should insert new event', () => {
                const text = 'New Event';
                const date = '12122021';
                mockMethodCall('events.insert', text, date, {
                    context: { userId },
                });
        
                const events = EventsCollection.find({}).fetch();
                assert.equal(events.length, 2);
                assert.isTrue(events.some(event => 
                    event.text === text && 
                    event.date === date && 
                    event.userId === userId
                ));
            });

            it('should not insert new event if text is not a string', () => {
                const text = { obj: 1 };
                const date = '01012021';
                try {
                    mockMethodCall('events.insert', text, date, {
                        context: { userId },
                    });
                } catch(e) {
                    const events = EventsCollection.find({}).fetch();
                    assert.equal(events.length, 1);
                }
            });

            it('should not insert new event if date is not a string', () => {
                const text = "New Event";
                const date = { obj: 1 };
                try {
                    mockMethodCall('events.insert', text, date, {
                        context: { userId },
                    });
                } catch(e) {
                    const events = EventsCollection.find({}).fetch();
                    assert.equal(events.length, 1);
                }
            });

            it('should not insert new event without an user authenticated', () => {
                const text = "New Event";
                const date = "12122021";
                const fn = () => mockMethodCall('events.insert', text, date);
                assert.throw(fn, /Not authorized/);
                assert.equal(EventsCollection.find().count(), 1);
            });
        });

        describe('remove event', () => {
            it('should delete owned event', () => {
                mockMethodCall('events.remove', eventId, { context: { userId } });
                assert.equal(EventsCollection.find().count(), 0);
            });
    
            it('should not delete event without an user authenticated', () => {
                const fn = () => mockMethodCall('events.remove', eventId);
                assert.throw(fn, /Not authorized/);
                assert.equal(EventsCollection.find().count(), 1);
            });
    
            it('should not delete event from another owner', () => {
            const fn = () =>
                mockMethodCall('events.remove', eventId, {
                    context: { userId: 'somebody-else-id' },
                });
                assert.throw(fn, /Access denied/);
                assert.equal(EventsCollection.find().count(), 1);
            });
        });
    });
  });
}