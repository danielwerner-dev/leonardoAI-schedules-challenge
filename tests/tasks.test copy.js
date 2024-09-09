const request = require('request');
const chai = require('chai');
let scheduleId;
let taskId;

describe('Tasks API endpoints', function () {
    it('Should POST /tasks with missing keys', function () {
        const taskWithMissingKeys = {
            startTime: "2023-12-01T08:00:00.000Z",
            duration: 120,
            type: "work"
        };

        const postTaskOptions = {
            method: 'POST',
            url: 'http://localhost:3000/api/tasks',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskWithMissingKeys),
        };

        request(postTaskOptions, function (taskErr, response) {
            if (taskErr) {
                return;
            }

            chai.expect(response.statusCode).to.equal(400);

            let res = JSON.parse(response.body);
            chai.expect(res.message).to.equal('accountId is required');
        });
    });

    it('Should PUT /tasks/:id', async function () {
        // Ensure you have a valid task ID to update
        if (taskId) {
            const updatedTaskData = {
                "accountId": 4,
                "startTime": "2023-12-01T09:00:00.000Z",
                "duration": 180,
                "type": "break"
            };

            const putTaskOptions = {
                method: 'PUT',
                url: `http://localhost:3000/api/tasks/${taskId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            };

            request(putTaskOptions, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(200);

                for (task in JSON.parse(response.body)) {
                    chai.expect(task.duration).to.equal(180);
                    chai.expect(task.accountId).to.equal(4);
                }
            });
        }
    });

    it('Should not PUT /tasks/:id with wrong type', async function () {
        // Ensure you have a valid task ID to update
        if (taskId) {
            const updatedTaskData = {
                "accountId": 4,
                "startTime": "2023-12-01T09:00:00.000Z",
                "duration": 180,
                "type": "Updated Task Type"
            };

            const putTaskOptions = {
                method: 'PUT',
                url: `http://localhost:3000/api/tasks/${taskId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            };

            request(putTaskOptions, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(404);

                let res = JSON.parse(response.body);
                chai.expect(res.message).to.equal('Type can either be \'work\' or \'break\'');
            });
        }
    });

    it('Should GET Schedule to Verify assoiated Task', async function () {
        if (scheduleId && taskId) {
            const getScheduleOptions = {
                method: 'GET',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(getScheduleOptions, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(200);

                const schedule = JSON.parse(response.body);
                chai.expect(schedule).to.have.property('id');
                chai.expect(schedule).to.have.property('accountId');
                chai.expect(schedule).to.have.property('agentId');
                chai.expect(schedule).to.have.property('startTime');
                chai.expect(schedule).to.have.property('endTime');

                const associatedTasks = schedule.tasks;
                const associatedTaskIds = associatedTasks.map((task) => task.id);
                chai.expect(associatedTaskIds).to.include(taskId);
            });
        }
    });

    it('Should DELETE Schedule with Associated Task', async function () {
        if (scheduleId) {
            const deleteScheduleOptions = {
                method: 'DELETE',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(deleteScheduleOptions, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(200);
                chai.expect(response.body).to.equal('Delete the associated tasks first to delete the schedule');
            });
        }
    });

    it('Should DELETE Tasks and Schedule', async function () {
        if (taskId && scheduleId) {
            const deleteTaskOptions = {
                method: 'DELETE',
                url: `http://localhost:3000/api/tasks/${taskId}`,
            };

            request(deleteTaskOptions, function (taskErr, taskResponse) {
                if (taskErr) {
                    return;
                }

                chai.expect(taskResponse.statusCode).to.equal(204);

                const deleteScheduleOptions = {
                    method: 'DELETE',
                    url: `http://localhost:3000/api/schedules/${scheduleId}`,
                };

                request(deleteScheduleOptions, function (scheduleErr, scheduleResponse) {
                    if (scheduleErr) {
                        return;
                    }

                    chai.expect(scheduleResponse.statusCode).to.equal(204);
                });
            });
        }
    });
})
