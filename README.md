# Tasks Schedule Challenge - Leonardo.AI

In this technical interview test, you are required to implement API endpoints for managing schedules and tasks using TypeScript. 
The project involves designing and building RESTful or Lambda API endpoints to handle scheduling and task management.

### Schedule
* `id`: Universally unique identifier (UUID) for the schedule
* `account_id`: Integer representing the account associated with the schedule
* `agent_id`: Integer representing the agent assigned to the schedule
* `start_time` | DateTime indicating the start time of the schedule
* `end_time`   | DateTime indicating the end time of the schedule

### Task
* `id`: UUID for the task
* `account_id`: Integer representing the account associated with the schedule
* `schedule_id`: UUID referencing the schedule to which the task belongs
* `start_time`: DateTime indicating the start time of the schedule
* `duration`: Integer representing the duration of the task
* `type`: String enumeration with values 'break' or 'work', indicating the type of task

### Table Relationship
There's a one-to-many relationship between Schedule and Tasks, where a Schedule can have multiple Tasks associated.

### Prerequisites
* Have Postgres running locally in the development environment or in a cloud instance.

## 🧭 Runnig the project

1. Clone this repository running the following command:

```bash
git clone leonardoAI-schedules-challenge.git
# or
gh repo clone danielwerner-dev/leonardoAI-schedules-challenge
```

2. Acces repository
```bash
cd leonardoAI-schedules-challenge
```

3. Database
    - rename `.env.example` to `.env` and replace `user:password` with your Postgres credentials.
      It should look like this: `postgresql://postgres:somepassword@localhost:5432/leonardoai`
    - Create `leonardoai` database using the following command:
      ```bash
      psql -h localhost -p 5432 -U postgres
      CREATE DATABASE leonardoai;
      ```
    - Run migrations, running following command:
      ```bash
      yarn prisma migrate dev
      ```
      ![image](https://github.com/user-attachments/assets/725f1a83-68b6-4f7b-af0a-d84e05f12a65)

4. Starting the App
Start API by running the following command:
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

5. Runnig tests
Run tests with following command:
```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```
![image](https://github.com/user-attachments/assets/ed8f5938-3674-4510-b1e0-2aa48662f8b5)

# Optimisations

* I would implement a rate-limiting mechanism in the application to prevent overwhelming the API with too many requests. This can be done by keeping track of the number of requests made to the API within a certain time window and delaying or rejecting new requests if the limit is exceeded. We can choose between Leaky Bucket and Token Bucket, both have pros and cons
* Rate-limiting also helps to prevent brute force attacks
* Implementing retry-after header to specifies a time to wait before sending another request.
* Thus, I'll choose TOKEN BUCKET because memory usage is minimal and if the bucket is full, tokens are discarded.
* I'm not choosing LEAK BUCKET because may result in slowness for users (affecting application UI/UX), because requests are being throttled
Additionally, I would implement a retry mechanism to handle the 429 errors, helping to prevent the application from overwhelming the API with too many requests in a short period of time