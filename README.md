# Address Manager

Save and share addresses!

## Description

#### Important observations about this project

- Used stack: JavaScript, Postgresql, Express.
- It have swagger docs, its not perfet but it helps, it can be accessed on localhost:3333/api-docs, there's no automatic authentication btw.
- There's a file with the http requests on the project root, it's from Api Dog software.
- There's a env file on the project root, just because there's no sensitive information, so, I let it there.
- It rely on docker to run, if not the entire application, it need docker to run the database.
- There's a endpoint to list logs, this one is just to visualization purposes, it's not a thing to use in real world.
- It was builded on Linux Ubuntu, with Node v22.2.0

## Install and Run

#### Running on local machine

- fist install the dependencies, on the root of project, run on terminal:

```bash
  npm install
```

- after installing node dependencies, we can initialize our database with docker:

```bash
    docker-compose up -d postgres
```

- now, to migrate the tables to the database, run:

```bash
    npm run migrate
```

- finally to start the application:

```bash
    npm run dev
```

#### Running with docker

- build the docker image (amapp is the name, short for address manager app):

```bash
    docker build -t amapp .
```

- start the app container and the db container with docker compose:

```bash
    docker-compose up | docker-compose up -d
```

- our app will start when the docker compose starts it, so, we need to migrate the tables:

```bash
    npm run migrate
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

- Just some points of the applications have coverage
- Assertive programing was implemented in the user routes

## Usage/Examples

- The usage and examples are on the swagger documentation and in the api dog file.
