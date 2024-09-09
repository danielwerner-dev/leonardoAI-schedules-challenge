const request = require('request');
const chai = require('chai');
let scheduleId;
let taskId;

describe('Schedules API endpoints', function () {
    it('Should GET /schedules initially', async function () {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/api/schedules',
        };

        request(options, function (err, response) {
            if (err) {
                return;
            }

            chai.expect(response.statusCode).to.equal(200);
        });

    });

    it('Should POST /schedules', async function () {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/api/schedules',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "accountId": 3,
                "agentId": 2,
                "startTime": "2023-11-30T00:00:00.000Z",
                "endTime": "2023-12-30T00:00:00.000Z"
            }),
        };

        request(options, (err, response) => {
            if (err) {
                return;
            }

            chai.expect(response.statusCode).to.equal(201);

            // Store the schedule ID for use in the other test cases
            scheduleId = JSON.parse(response.body).id;
        });
    });

    it('Should not POST /schedules with missing keys', async function () {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/api/schedules',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "accountId": 3,
                "agentId": 2,
                "endTime": "2023-12-30T00:00:00.000Z"
            }),
        };

        request(options, (err, response) => {
            if (err) {
                return;
            }

            chai.expect(response.statusCode).to.equal(400);

            let res = JSON.parse(response.body);
            chai.expect(res.message).to.equal('startTime is required');

        });
    });

    // Get by ID
    it('Should GET /schedules/:id', async function () {
        if (scheduleId) {
            const options = {
                method: 'GET',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(200);
                if (!response.body) {
                    chai.expect.fail('Response body is empty');
                }

                for (const schedule of JSON.parse(response.body)) {
                    chai.expect(schedule).to.have.property('id');
                    chai.expect(schedule).to.have.property('accountId');
                    chai.expect(schedule).to.have.property('agentId');
                    chai.expect(schedule).to.have.property('startTime');
                    chai.expect(schedule).to.have.property('endTime');
                }
            });
        }
    });

    it('Should PUT /schedules/:id', async function () {
        if (scheduleId) {
            const options = {
                method: 'PUT',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "accountId": 10,
                    "agentId": 24,
                    "startTime": "2023-11-30T00:00:00.000Z",
                    "endTime": "2023-12-30T00:00:00.000Z"
                }),
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(200);

                for (const schedule of JSON.parse(response.body)) {
                    chai.expect(schedule).to.have.property('id');
                    chai.expect(schedule).to.have.property('accountId');
                    chai.expect(schedule).to.have.property('agentId');
                    chai.expect(schedule).to.have.property('startTime');
                    chai.expect(schedule).to.have.property('endTime');
                    chai.expect(schedule.accountId).to.equal(10);
                    chai.expect(schedule.agentId).to.equal(24);
                }
            });
        }
    });

    it('Should DELETE /schedules/:id', async function () {
        if (scheduleId) {
            const options = {
                method: 'DELETE',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(204);
            });
        }
    });

    it('Should GET /schedules/:id for deleted schedule', async function () {
        if (scheduleId) {
            const options = {
                method: 'GET',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(404);
                let responseMessage = JSON.parse(response.body);
                chai.expect(responseMessage.message).to.equal('Schedule not found');
            });
        }
    });

    it('Should PUT /schedules/:id for deleted schedule', async function () {
        if (scheduleId) {
            const options = {
                method: 'PUT',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountId: 2,
                }),
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(404);
                let responseMessage = JSON.parse(response.body);
                chai.expect(responseMessage.message).to.equal('Schedule not found');
            });
        }
    });

    it('Should DELETE /schedules/:id for deleted schedule', async function () {
        if (scheduleId) {
            const options = {
                method: 'DELETE',
                url: `http://localhost:3000/api/schedules/${scheduleId}`,
            };

            request(options, function (err, response) {
                if (err) {
                    return;
                }

                chai.expect(response.statusCode).to.equal(204);
            });
        }
    });

    it('Should Create a Schedule and associate a Task', async function () {
        const scheduleData = {
            "accountId": 456,
            "agentId": 2,
            "startTime": "2023-11-30T00:00:00.000Z",
            "endTime": "2023-12-30T00:00:00.000Z"
        };

        const taskData = {
            "accountId": 3,
            "startTime": "2023-12-01T08:00:00.000Z",
            "duration": 120,
            "type": "break"
        };

        // POST the schedule
        const postScheduleOptions = {
            method: 'POST',
            url: 'http://localhost:3000/api/schedules',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        };

        request(postScheduleOptions, function (err, scheduleResponse) {
            if (err) {
                return;
            }

            chai.expect(scheduleResponse.statusCode).to.equal(201);

            // Store the schedule ID for use in other test cases
            scheduleId = JSON.parse(scheduleResponse.body).id;

            // POST the task associated with the schedule
            taskData.scheduleId = scheduleId;
            const postTaskOptions = {
                method: 'POST',
                url: 'http://localhost:3000/api/tasks',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            };

            request(postTaskOptions, function (taskErr, taskResponse) {
                if (taskErr) {
                    return;
                }

                chai.expect(taskResponse.statusCode).to.equal(201);

                // Store the task ID for use in other test cases
                taskId = JSON.parse(taskResponse.body).id;
            });
        });
    });
})
