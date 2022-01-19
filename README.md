# Introduction

This is a simple url shortener application built by Matt Webber. It uses React for the frontend, NodeJS/Express for the REST service, and MongoDB for the backend. It also uses Docker to allow us to quickly deploy it into a container.

# Getting Started
1. Ensure you have a recent version of Docker installed.
2. Clone the repository to your local environment.
3. Navigate to the root of your project in a terminal.
4. To start the project's docker containers, simply run `docker-compose up -d --force-recreate`.  Once this has completed you should be able to access the application at `http://localhost:3000`.
5. To stop the Docker containers, just run `docker-compose down --rmi all`. 

# Testing
To run the testing you need to navigate to either the `app` directory for frontend tests, or the `server` directory for backend tests. Once there, run an `npm install` and then run `npm run test`. This will trigger the Jest tests.
