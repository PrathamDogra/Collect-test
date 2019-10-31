# Atlan Challenge

## The Cahllenge

Implement a solution through which the user can stop the long-running task(like upload of a csv file) at any given point in time, and can choose to resume or terminate it. This will ensure that the resources like compute/memory/storage/time are used efficiently at our end, and do not go into processing tasks that have already been stopped (and then to roll back the work done post the stop-action)

## Technologies used

* Node.js ( as runtime environment to run JavaScript code)
* React.js (as a client)
* MongoDB (as database)
* Mongoose (as database schema)

## API Endpoints

### For CSV file upload

* http://localhost:8080/employee/add

### To Stop the upload

* http://localhost:8080/employee/stop

### To Resume the upload

* http://localhost:8080/employee/stop

## Project Demo

![Alt Text](https://github.com/PrathamDogra/Collect-test/blob/master/Atlan.gif)

## How to run the Project
