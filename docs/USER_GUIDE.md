# User Guide

This is the User Guide for the Hackathon Starter Kit. Here you will find additional documentation and guides on how to use the project.

If you think we are missing something or you have ideas for more guides that should be on this page, [let us know][email] or [contribute some][mlh-contributing]!

## How It Works

This project simply provides the boilerplate to get started with a new application. It provides the tools and guides to get started quickly. You can use this project as a starting point for building new applications during a hackathon.

Even if you are not using it for a hackathon, it should save you time getting started building and learning web development.

## Starting the app

**Step 1. Clone the code into a fresh folder**

```
$ git clone https://github.com/MLH/mlh-hackathon-nodejs-starter.git
$ cd mlh-hackathon-nodejs-starter
```

**Step 2. Install Dependencies.**

Next, we need to install the project dependencies, which are listed in `package.json`.

```
$ npm install
```

**Step 3: Create an app on GitHub**

Head over to [GitHub OAuth apps](https://github.com/settings/developers) and create a new OAuth app. Name it what you like but you'll need to specify a callback URL, which should be something like:

```
https://localhost:5000/auth/callback/github
```

The default port for our app is `5000`, but you may need to update this if your setup uses a different port or if you're hosting your app somewhere besides your local machine.

**Step 4: Update environment variables and run the Server.**

Create a new file named `.env` by duplicating `.env.sample`. Update the new file with the GitHub credentials. It should look similar to this:

```
# .env file
DATABASE_URL="[INSERT_DATABASE_URL]"
GITHUB_CLIENT_ID="[INSERT_CLIENT_ID]"
GITHUB_CLIENT_SECRET="[INSERT_CLIENT_SECRET]"
```

You replace the GitHub credentials here and update the database URL. Learn more about the required [Environment Variables here](#environment-variables).

Now we're ready to start our server which is as simple as:

```
$ npm start
```

Open http://localhost:5000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

### `npm start`

Runs the app in development mode.
Open http://localhost:5000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

### `npm install`

Installs the dependencies for your application. Used to add new functionality to the project.

## Project Structure

```
mlh-hackathon-nodejs-starter/
├── README.md
├── Procfile
├── package.json
├── config/
├── docs/
└── app/
  ├── controllers/
  │   ├── auth.js
  │   ├── github.js
  │   └── public.js
  ├── models/
  │   ├── migrations/
  │   ├── index.js
  │   └── user.js
  ├── services/
  │   └── github.js
  ├── static/
  │   ├── css/
  │   ├── img/
  │   └── favicon.ico
  ├── templates/
  │   ├── home/
  │   ├── layouts/
  │   ├── partials/
  │   └── tutorial/
  ├── index.js
  └── routes.js
```

The core of the app is contained within the `app` directory. It contains `index.js`, the code to create and run the app, `/controllers`, handles all the endpoints and business logic, `/models`, handles all the features for the data models like users, `/templates`, contains the templates for [Handlebars](https://handlebarsjs.com/)-based layouts, and `/static`, contains all the static assets. You can learn more about [the structure of Express apps here](https://expressjs.com/en/starter/generator.html).

## Express Development

Express is a minimal framework for developing web applications in JavaScript. That means it is easy to get started with a basic application without a lot of boilerplate. This also means it relies heavily on external libraries, or extensions, to add new functionality. You can learn more about how to use Express with [this guide](https://expressjs.com/en/guide/routing.html).

## OAuth Authentication

This project uses GitHub OAuth to handle user authentication. Meaning a new user of your site will sign in with a GitHub account instead of a new username and password. This typically is more secure because you won't be storing new credentials for each user. It is also quicker and easier for the user. Win-win.

The tradeoff is that you have to go through the [GitHub OAuth flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/) with your application. This process is pretty simple:

1. Users clicked **Login with GitHub**.
2. Users are redirected to GitHub.com to request their identity.
3. Users grant permission to your app and are redirected back to your site.
4. Your app sends a request for the user access token.
5. Your app uses GitHub's API with the stored access token.

The code that handles this process is contained in `controllers/auth.js` and `services/github.js`.
To use this authentication technique you need to create a new GitHub OAuth app. [Instructions listed below](#github-oauth).

## Fetching Data

This project uses the [axios](https://github.com/axios/axios) package to make HTTP requests. An example request would look like this:

```js
const axios = require("axios");

axios.get("/user?ID=12345").then(function(response) {
  // handle success
  console.log(response);
});

// Prints out results.
```

These type of requests can be made inside of your controllers to fetch and store data for your application. For example, you might make a request to GitHub's API and display it directly in HTML. Depending on your needs, you can also store this data to your database to use later.

To make things simple, we provide a service for GitHub-related requests, which will handle user authentication. Here is that [service in action](https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/app/controllers/github.js).

## Static Files

To serve static files such as images, CSS files, and JavaScript files, we use the `express.static` built-in middleware function in Express. These files located in the `/static` folder. The folder currently has some default files to get started.

```
static/
  ├── css/
  |  ├── color.css
  |  └── style.css
  ├── img/
  |  └── logo.png
  └── favicon.ico
```

The `style.css` file is a good place to add custom CSS. Add any of your CSS or JavaScript in this folder.

## Saving to a Database

### Using Postgres

Express does not come with a database layer by default. It is designed to have a database added later. You can add your own preferred database type to the project if needed. We like the PostgreSQL database which is easy to deploy with Heroku.

To use PostgreSQL with your project, you will need to [install it locally](https://wiki.postgresql.org/wiki/What's_new_in_PostgreSQL_9.4).

1. Install [Postgres locally](https://wiki.postgresql.org/wiki/What's_new_in_PostgreSQL_9.4)\*
2. Make sure Postgres is running locally.
3. Replace the `DATABASE_URL` variable in `.env` with your database.
   - i.e. `DATABASE_URL=postgresql://localhost:5432/mlh-hackathon-nodejs-starter`

\* A simple way for Mac OS X users to install Postgres is using [Postgres.app](https://postgresapp.com/).

### Sequelize

This project uses [Sequelize](http://docs.sequelizejs.com/) for interacting with the database layer. It is a Node.js package that adds support for [PostrgreSQL](https://www.sqlalchemy.org/) to your application. It is a simple ORM that allows us to make SQL requests in JavaScript. This means instead of writing SQL directly, we can call object-based methods. Here is an example of creating and saving a user:

```js
const user = await User.findAll({ where: { username: "octocat" } });
console.log(user);
```

This gives us flexibility in our database layer and keeps our JavaScript code clean of SQL commands. The data models located in the `/models` directory each use the `Sequelize` library.

## <a name='github-oauth'>GitHub OAuth Apps</a>

This project uses a GitHub OAuth app for Authentication and uses GitHub's API. To setup GitHub for authentication, following these steps:

1. Register an account on Github.com.
2. Visit the [GitHub OAuth apps page](https://github.com/settings/developers).
3. Create a new OAuth app.
   - Enter an application name and a homepage URL.
   - Add callback URL, use http://localhost:5000/ for local development.
   - Click 'Register application'.
4. Add your GitHub credentials to your environment variables in `.env`.
   - Replace `[INSERT_CLIENT_ID]` with your GitHub Client ID.
   - Replace `[INSERT_CLIENT_SECRET]` with your GitHub Client Secret.

## <a name='environment-variables'>Environment Variables</a>

To run the project, you need to configure the application to run locally. This will require updating a set of environment variables specific to your environment. Create a new file named `.env` by duplicating `.env.sample`. Update the new file with the GitHub credentials. It should look similar to this:

```
# .env file
DATABASE_URL="[INSERT_DATABASE_URL]"
GITHUB_CLIENT_ID="[INSERT_CLIENT_ID]"
GITHUB_CLIENT_SECRET="[INSERT_CLIENT_SECRET]"
```

The `DATABASE_URL` variable is the path to your database system. This is where you can add the URL to your PostgreSQL.

The `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` variables are the app credentials from your [GitHub OAuth app](https://github.com/settings/developers).

## Deployment

### Deploy to Heroku

Heroku is an easy way for developers to deploy their application. To deploy to Heroku, make sure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed first. Then follow these steps:

1. Clone the code into a fresh folder: `git clone https://github.com/MLH/mlh-hackathon-nodejs-starter.git`
2. Navigate to the new folder: `cd mlh-hackathon-nodejs-starter`
3. Create a new Heroku app: `heroku create`
4. Push the code to Heroku with git: `git push heroku master`
5. Make sure the app builds and you can open it: `heroku open`

Alternatively, you can use this button to create a new application on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/MLH/mlh-hackathon-nodejs-starter)

# Support

If you are having problems running the project or getting it to work, check the [issue tracker][issues] for any related issues. It might also have the solution to your issue. If an issue doesn't already exist, feel free to open a new issue. We will try to respond as quickly as possible.

You can also reach out to [our email][email] to help with more pressing issues.

[mlh-contributing]: https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/docs/CONTRIBUTING.md
[issues]: https://github.com/MLH/mlh-hackathon-nodejs-starter/issues
[email]: mailto:hi@mlh.io
