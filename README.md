# MERNG Social Media App

No real name for this project, it's just a social media app used to practice the MERNG Stack.

## Current Status

- Back end in place, with a GraphQL server, Complete
- React Front End Complete

## Installation

Use NPM to get started.
Open a console window in the root directory and run:

```bash
npm install
```

CD into the Client directory and run:

```bash
npm install
```

You'll now have all the server and client dependencies installed

## Usage

```javascript
//Create a dotenv file with the following keys in the root directory of the project (.env)
MONGODB_CONNECTION_STRING = "your mongodb connection string here"
JWT_SECRET_KEY = "your key here"

//Start the GraphQL server from the root directory
npm run start

//Open a second terminal in the root directory
cd /client
npm run start

```

## Server made with

- GraphQL
- MongoDB
- Mongoose
- Apollo Server
- BcryptJS
- JSONWebToken

## Client/Frontend made with

- React
- React Router DOM
- Apollo Client
- Semantic UI React
- Moment (datetimes)
- JWT Decode
