
This is a basic template that contains the registration, login and session verification processes. The technologies used are node, typescript, react, posgres. To handle states in react the redux toolkit is used.

# Run Application with Docker

In this session is explained how to up and down the containers of this application.

```bash
# In the root folder execute:

docker-compose up

# to delete the containers execute:

docker-compose down

```

# Run Application Local without Docker

Below mentioned are the steps to run the application locally.

```bash
#To the server application, in the root folder, execute:

npm run server

#To the client application, in the root folder, execute: 

npm run client

```

# Run Test

Below mentioned are the steps to execute the test for the project.

```bash
#To execute the server tests, in the root folder, execute:

npm run server-test

# or 

npm run server-test-watch 

```