# Evaluations System

This is a full-stack application for managing evaluations between employees.

## Configuration and Execution

To run the project, you need to have Node.js installed on your machine.

1. Clone the repository.
2. Navigate to the project root and run `npm install` to install the dependencies.
3. Set up the environment variables in the `.env` file.
4. Run `npm run seed:departments` to seed the departments collection.
5. Run `npm run dev` to start the server in development mode.
6. Open a web browser and navigate to `http://localhost:3000`.


## Project Structure

The project is organized in the following folders:

* `src`: Source code for the application.
* `src/controllers`: Controller functions for the routes.
* `src/middlewares`: Middleware functions for authentication and authorization.
* `src/models`: Data models for the MongoDB collections.
* `src/repositories`: Repository functions for interacting with the models.
* `src/routes`: API routes for the application.
* `src/services`: Service functions for performing complex operations.
* `src/utils`: Utility functions for error handling and other tasks.
* `tests`: Test files for the application.

## API Documentation

API documentation is available at /api-docs. This is generated using Swagger and provides a detailed overview of the API endpoints and their usage.

## Design Decisions

The application is built using a layered architecture:

* The `controllers` layer receives the requests and delegates the work to the `services` layer.
* The `services` layer performs complex operations and interacts with the `repositories` layer.
* The `repositories` layer interacts with the `models` layer.
* The `models` layer interacts with the MongoDB database.

The application uses the following libraries:

* Express.js for building the web server.
* MongoDB for storing data.
* Mongoose for interacting with the MongoDB database.
* Swagger for generating API documentation.
* Node-Cron for scheduling jobs.

## Running Tests

To run the tests, run `npm test` in the project root. The tests will be executed using Jest.

The tests are organized in the following folders:

* `tests/controllers`: Tests for the controller functions.
* `tests/integrations`: Tests for the integrations.

