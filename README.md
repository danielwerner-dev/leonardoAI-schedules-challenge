# Tasks Schedule Challenge - Leonardo.AI

In this technical interview test, you are required to implement API endpoints for managing schedules and tasks using TypeScript. 
The project involves designing and building RESTful or Lambda API endpoints to handle scheduling and task management.

### Schedule table
| column | description |
| :---: | :--- |
| id | Universally unique identifier (UUID) for the schedule |
| account_id | Integer representing the account associated with the schedule |
| agent_id | Integer representing the agent assigned to the schedule |
| start_time | DateTime indicating the start time of the schedule |
| end_time   | DateTime indicating the end time of the schedule |

### Task table
| column | description |
| :---: | :--- |
| id | UUID for the task |
| account_id | Integer representing the account associated with the schedule |
| schedule_id | UUID referencing the schedule to which the task belongs |
| start_time | DateTime indicating the start time of the schedule |
| duration   | Integer representing the duration of the task |
| type       | String enumeration with values 'break' or 'work', indicating the type of task |

## 🧭 Runnig the project

**Clone este repositório**

```bash
git clone leonardoAI-schedules-challenge.git
```

## 🔖 Database
If the leo_db database does not exist, create it manually using the following command:
```bash
    psql -h <host> -p <port> -U <username>
    CREATE DATABASE leonardoai;
```

## Starting the App
With database configured and created, start app by running the following command:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

This will start the development server on port 3000. You can then access the app going to [http://localhost:3000](http://localhost:3000)

## Runnig tests
Run tests with following command:
```bash
yarn test
```
