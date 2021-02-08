# Full Stack React Express Application

## Introduction
This repository contains a simple Full Stack Express / React application. It is intended to demonstrate as wide an array of features as possible while still keeping the app simple and easy to understand.
 
 This application accompanies the course on Pluralsight [Building a Full Stack Application with Express and React](https://www.pluralsight.com/courses/react-express-full-stack-app-building).
 
 This application consists of Front End component (located in the `app` directory) that is built with Redux and React. It also has a Back End component (located in the `server` directory) that uses Express to manage

## Installation
First, install the programs required to run the application:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [Mongo.DB](https://docs.mongodb.com/manual/installation/)

Next, clone this repository and install dependencies:

```
git clone git@github.com:danielstern/express-react-fullstack.git
```

```
npm install
```

Also, make sure MongoDB is running by navigating to the installation directory and running (in cmd or terminal), replacing the path with your chosen Mongo directory:

```
C:\Data\bin\mongod.exe
```

Now, start the development environment with the following command:

```
npm run dev
```

The application should open automatically. 

## Troubleshooting
Problem: The application won't start!

Try:
1. Run `npm install` again
2. Update your version of `Node.js` to the latest
3. Clone the finished repo and start from there

Problem: I'm getting weird error XYZ!

Try:
1. Cancel `npm run dev` (with ctrl-C on windows) and run it again
2. If there error mentions any particular file, visit that file and make sure you didn't make any common errors (capitalization of property names, forgetting to destructure paramaters with curly brackets)
3. Still no luck? Clone the finished repo and prune away parts of it until you are at the point you left off.

## Challenge Task Solutions

### Connected Username Component
1. Create a [connected username component](https://github.com/danielstern/express-react-fullstack/blob/master/src/app/components/UsernameDisplay.jsx) which matches user data with an ID provided as a prop.
2. Update the server-side state assembly process to include the usernames (but not passwords or any sensitive data) of any users which will be relevant to the current session.

### Sign Up 
This version of the application is found at the [Add Sign Up Branch](https://github.com/danielstern/express-react-fullstack/tree/add-signup/src/app/components).

1. Add a link to the sign up page from the login page.
2. Create a Sign Up route, which is almost identical to the Login route.
3. Add a saga to communicate requests from the Login Route to the server.
4. Add a route to the server which creates new users in the database.

### Security
Coming February 2019.
