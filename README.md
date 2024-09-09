# Tasks Schedule Challenge

In this technical interview test, you are required to implement API endpoints for managing schedules and tasks using TypeScript. 
The project involves designing and building RESTful or Lambda API endpoints to handle scheduling and task management.

# Schedule table
| column | description |
| --- | --- |
| id | Universally unique identifier (UUID) for the schedule |
| account_id | Integer representing the account associated with the schedule |
| agent_id | Integer representing the agent assigned to the schedule |
| start_time | DateTime indicating the start time of the schedule |
| end_time   | DateTime indicating the end time of the schedule |

# Task table
| column | description |
| --- | --- |
| id | UUID for the task |
| account_id | Integer representing the account associated with the schedule |
| schedule_id | UUID referencing the schedule to which the task belongs |
| start_time | DateTime indicating the start time of the schedule |
| duration   | Integer representing the duration of the task |
| type       | String enumeration with values 'break' or 'work', indicating the type of task |

