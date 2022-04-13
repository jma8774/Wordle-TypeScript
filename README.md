# Wordle TypeScript (WIP)

Just another Wordle game on the web, the game is really fun and really gets your brain going! I wanted to tackle and try to recreate my own version of this game so I can play it unlimited times (when Wordle first came out on NYT, it was a daily game).

The purpose of this project was to learn Typescript and to dockerize the React app with Docker and deploy it onto AWS ECS.

Built CI/CD pipeline in GitHub Actions that detects any new pull-request/push and will perform automatic tests and push/deploy new image to AWS Elastic Container Registry. Then later on, when all is ready, we can deploy the new image in ECR by running a service on an AWS cluster.

Currently hosted via [GitHub Pages](https://www.jiamingma.me/Wordle-TypeScript/).

<div align="center">
    <img src="https://i.imgur.com/e83w6I7.png" width="500">
</div>

# Usage

### Clone project

Clone the project from source:

    git clone https://github.com/jma8774/Wordle-TypeScript.git
    cd Wordle-TypeScript/root

## Docker Production Containers

Install [Docker](http://docker.com) container before you proceed. (Confirm installation by typing `docker --version`)

The production build only has frontend at the moment, will eventually containerize the backend server.

### Run production container

The production container will build the React project into static files and serve them with nginx.

Run the docker-compose.prod file and go to http://localhost:3000/ to see the app:

    docker compose -f docker-compose.prod.yml up --build -d

To stop it:

    docker compose -f docker-compose.prod.yml down

## Frontend Dev

Install [Node.js](https://nodejs.org/en/) before you proceed. (Confirm installation by typing `node --version`)

Go to the frontend directory:

    cd frontend

### Install and start

Install dependencies and start it, then go to http://localhost:3000/ to see the app:

    npm install
    npm start

### Testing

Jest is the testing framework used for this project, all the tests end with `.test.tsx` extension. They are located in the folder at `/src/test`. In the future, test files may be moved to the folder alongside their src file.

To run the tests, simply run this command in the project directory:

    npm test
