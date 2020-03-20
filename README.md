# Introduction

This is a hackathon boilerplate for new Node.js applications created by [Major League Hacking](https://github.com/mlh). It is for hackers looking to get started quickly on a new hackathon project using the Node.js environment.

- [Installation Guide](#installation-guide) - How to get started with a new Node.js app
- [User Guide](https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/docs/USER_GUIDE.md) - How to develop apps created with this starter project
- [Contributing Guide](https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/docs/CONTRIBUTING.md) - How to contribute to the project

# <a name='installation-guide'>Installation Guide</a>

This project requires the following tools:

- Node.js - The JavaScript environment for server-side code. If Node.js is not installed on your machine you can download it from [here](https://nodejs.org/en/download/)
- NPM - A Node.js package manager used to install dependencies. If NPM wasn't installed on your machine by installing you will be able to use it
- PostgreSQL - A relational database system. If it is not installed on your machine you can download it from [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

To get started, install NPM and Postgres on your local computer if you don't have them already. A simple way for Mac OS X users to install Postgres is using [Postgres.app](https://postgresapp.com/).

A simple guide to install postgres on windows is [here](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm)

## Getting Started

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

![App Screenshot](sreenshot.png)

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

# What's Included?

- [Express](https://expressjs.com/) - A minimal web framework for Node.js web applications
- [Sequelize](http://docs.sequelizejs.com/) - A promise-based ORM for Node.js that supports PostgreSQL, MySQL, and SQLite.
- [Bootstrap 4](https://getbootstrap.com/) - An open source design system for HTML, CSS, and JS.
- [Handlebars](https://handlebarsjs.com/) - A popular templating language for building layouts.

# Code of Conduct

We enforce a Code of Conduct for all maintainers and contributors of this Guide. Read more in [CONDUCT.md][mlh-conduct].

# License

The Hackathon Starter Kit is open source software [licensed as MIT][mlh-license].

[mlh-conduct]: https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/docs/CONDUCT.md
[mlh-license]: https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/LICENSE.md
