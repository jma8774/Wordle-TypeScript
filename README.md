# Wordle Typescript (WIP)

Just another Wordle game on the web, purpose of this project was to learn Typescript and to dockerize the React app with Docker and deploy it onto AWS ECS. 

Made use of custom hooks in React to seperate logic which made the code easier to manage and did unit testing using Jest.

Incorporated CI/CD pipeline of automatic tests and deploying on pull-request/push to main by using GitHub Actions.

Currently hosted via [GitHub Pages](https://www.jiamingma.me/Wordle-Typescript/).

# Usage

### Clone project

Clone the project from source:

    git clone https://github.com/jma8774/Wordle-Typescript.git
    cd Wordle-Typescript
    
## Docker Usage
Install [Docker](http://docker.com) container to run the application locally.

### Run production container

The production container will build the React project into static files and will be served with a nginx server.

Run the docker-compose.prod file and go to http://localhost:8080/ to see the app:

    docker-compose -f docker-compose.prod.yml up -d  
    
To stop it:

    docker-compose -f docker-compose.prod.yml down
    
## Node.js Usage
Install dependencies and start it, then go to http://localhost:3000/ to see the app:

### Install and start

    npm install
    npm start


