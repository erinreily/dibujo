import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { formatDate, formatDatePretty, getOffsetDate } from '/imports/ui/util/commonUtils.js';

if (Meteor.isServer) {
  describe('Events', () => {
    describe('methods', () => {
        const date = new Date('2021-01-01T03:00:00');

        describe('formatDate function', () => {
            it('should return date formatted as mmyydddd', () => {
                const expectedDate = "01012021";
                const formattedDate = formatDate(date);
                assert.equal(formattedDate, expectedDate);
            });
        });

        describe('formatDatePretty function', () => {
            it('should return date formatted as Month dd', () => {
                const expectedDate = "January 1";
                const formattedDate = formatDatePretty(date);
                assert.equal(formattedDate, expectedDate);
            });
        });

        describe('getOffsetDate function', () => {

            const weekdays = [{
                day: 'Sunday',
                date1: 18,
                date2: 25,
                month: 3
            }, {
                day: 'Monday',
                date1: 19,
                date2: 26,
                month: 3
            }, {
                day: 'Tuesday',
                date1: 20,
                date2: 27,
                month: 3
            }, {
                day: 'Wednesday',
                date1: 21,
                date2: 28,
                month: 3
            }, {
                day: 'Thursday',
                date1: 22,
                date2: 29,
                month: 3
            }, {
                day: 'Friday',
                date1: 23,
                date2: 30,
                month: 3
            }, {
                day: 'Saturday',
                date1: 24,
                date2: 1,
                month: 4
            }];

            weekdays.forEach((weekday) => {
                it('should get the offset date based on weekday', () => {
                    const relativeDate = new Date(2021, 3, 22); //thursday
                    const expectedDate = new Date(2021, 3, weekday.date1);
    
                    const offsetDate = getOffsetDate(relativeDate, weekday.day);
                    assert.equal(offsetDate.getMonth(), expectedDate.getMonth());
                    assert.equal(offsetDate.getDate(), expectedDate.getDate());
                    assert.equal(offsetDate.getYear(), expectedDate.getYear());
                });

                it('should get the offset date across months based on weekday', () => {
                    const relativeDate = new Date(2021, 3, 27); //thursday
                    const expectedDate = new Date(2021, weekday.month, weekday.date2);
    
                    const offsetDate = getOffsetDate(relativeDate, weekday.day);
                    assert.equal(offsetDate.getMonth(), expectedDate.getMonth());
                    assert.equal(offsetDate.getDate(), expectedDate.getDate());
                    assert.equal(offsetDate.getYear(), expectedDate.getYear());
                });
            });
        });
    });
  });
}