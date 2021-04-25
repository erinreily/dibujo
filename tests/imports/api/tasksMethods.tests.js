import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { assert } from 'chai';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
        const userId = Random.id();
        let taskId;

        beforeEach(() => {
            TasksCollection.remove({});
            taskId = TasksCollection.insert({
                text: 'Test Task',
                date: '01012021',
                createdAt: new Date(),
                userId
            });
        });

        afterEach(() => {
            stubs.restoreAll();
        });

        describe('insert task', () => {
            it('should insert new task', () => {
                const text = 'New Task';
                const date = '12122021';
                mockMethodCall('tasks.insert', text, date, {
                    context: { userId },
                });
        
                const tasks = TasksCollection.find({}).fetch();
                assert.equal(tasks.length, 2);
                assert.isTrue(tasks.some(task => 
                    task.text === text && 
                    task.date === date && 
                    task.userId === userId
                ));
            });

            it('should not insert new task if text is not a string', () => {
                const text = { obj: 1 };
                const date = '01012021';
                try {
                    mockMethodCall('tasks.insert', text, date, {
                        context: { userId },
                    });
                } catch(e) {
                    const tasks = TasksCollection.find({}).fetch();
                    assert.equal(tasks.length, 1);
                }
            });

            it('should not insert new task if date is not a string', () => {
                const text = "New Task";
                const date = { obj: 1 };
                try {
                    mockMethodCall('tasks.insert', text, date, {
                        context: { userId },
                    });
                } catch(e) {
                    const tasks = TasksCollection.find({}).fetch();
                    assert.equal(tasks.length, 1);
                }
            });

            it('should not insert new task without an user authenticated', () => {
                const text = "New Task";
                const date = "12122021";
                const fn = () => mockMethodCall('tasks.insert', text, date);
                assert.throw(fn, /Not authorized/);
                assert.equal(TasksCollection.find().count(), 1);
            });
        });

        describe('remove task', () => {
            it('should delete owned task', () => {
                mockMethodCall('tasks.remove', taskId, { context: { userId } });
                assert.equal(TasksCollection.find().count(), 0);
            });
    
            it('should not delete task without an user authenticated', () => {
                const fn = () => mockMethodCall('tasks.remove', taskId);
                assert.throw(fn, /Not authorized/);
                assert.equal(TasksCollection.find().count(), 1);
            });
    
            it('should not delete task from another owner', () => {
            const fn = () =>
                mockMethodCall('tasks.remove', taskId, {
                    context: { userId: 'somebody-else-id' },
                });
                assert.throw(fn, /Access denied/);
                assert.equal(TasksCollection.find().count(), 1);
            });
        });

        describe('set isChecked for task', () => {
            it('should change the status of a task', () => {
                const isChecked = true;
                mockMethodCall('tasks.setIsChecked', taskId, isChecked, {
                    context: { userId }
                });
        
                const updatedTask = TasksCollection.findOne(taskId);
                assert.equal(updatedTask.isChecked, isChecked);
            });

            it('should not change the status of a task if taskId is not a string', () => {
                const badTaskId = { taskId: 1 };
                const isChecked = true;
                stubs.create("updateStub", TasksCollection, 'update');
                try {
                    mockMethodCall('tasks.setIsChecked', badTaskId, isChecked, {
                        context: { userId },
                    });
                } catch(e) {
                    sinon.assert.notCalled(TasksCollection.update);
                }
            });

            it('should not change the status of a task if isChecked is not a Boolean', () => {
                const badIsChecked = true;
                stubs.create("updateStub", TasksCollection, 'update');
                try {
                    mockMethodCall('tasks.setIsChecked', taskId, badIsChecked, {
                        context: { userId },
                    });
                } catch(e) {
                    sinon.assert.notCalled(TasksCollection.update);
                }
            });

            it('should not change the status of a task without an user authenticated', () => {
                const isChecked = true;
                const fn = () => mockMethodCall('tasks.setIsChecked', taskId, isChecked);
                assert.throw(fn, /Not authorized/);
                assert.equal(TasksCollection.find().count(), 1);
            });
    
            it('should not change the status of a task from another owner', () => {
                const isChecked = true;
                const fn = () => mockMethodCall('tasks.setIsChecked', taskId, isChecked, {
                    context: { userId: 'somebody-else-id' },
                });
                assert.throw(fn, /Access denied/);
                assert.equal(TasksCollection.find().count(), 1);
            });
        });
    });
  });
}