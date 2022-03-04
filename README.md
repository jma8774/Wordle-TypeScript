# Wordle TypeScript (WIP)

Just another Wordle game on the web, purpose of this project was to learn Typescript and to dockerize the React app with Docker and deploy it onto AWS ECS. 

Built CI/CD pipeline in GitHub Actions that detects any new pull-request/push and will perform automatic tests and deploy to production on success.

Made use of custom hooks in React to seperate logic which made the code easier to manage and did unit testing using Jest.

Currently hosted via [GitHub Pages](https://www.jiamingma.me/Wordle-TypeScript/).

# Usage

### Clone project

Clone the project from source:

    git clone https://github.com/jma8774/Wordle-TypeScript.git
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


