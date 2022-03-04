# Wordle Typescript (WIP)

Just another Wordle game on the web, purpose of this project was to learn Typescript and to dockerize the React app with Docker and deploy it onto AWS ECS. 

Made use of custom hooks in React to seperate logic which made the code easier to manage and did unit testing using Jest.

Incorporated CI/CD pipeline of automatic tests and deploying on pull-request/push to main by using GitHub Actions.

Currently hosted via [GitHub Pages](https://www.jiamingma.me/Wordle-TypeScript/).

# Usage
Install [Docker](http://docker.com) container to run the application locally.

### Install

Clone the project from source:

    git clone https://github.com/jma8774/Wordle-TypeScript.git
    cd Wordle-Typescript

### Run production container

The production container will build the React project into static files and will be served with a nginx server.

Run the docker-compose.prod file and go to http://localhost:8080/ to see the app:

    docker-compose -f docker-compose.prod.yml up -d  
    
To stop it:

    docker-compose -f docker-compose.prod.yml down
    
### Run dev container

Note that running in dev mode will map your host src directory to the container src directory, meaning any changes made to the code on the host machine will be reflected in the docker container (like normal React development).

Run the docker-compose.dev file and go to http://localhost:3000/ to see the app:

    docker-compose -f docker-compose.dev.yml up -d  
    
To stop it:

    docker-compose -f docker-compose.dev.yml down -v  
    
    

