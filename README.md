# LHD: Share Playlists

## Getting Started

**Step 1. Clone the code into a fresh folder**

```bash
git clone https://github.com/sudiptog81/lhd-playlists.git
cd lhd-playlists
```

**Step 2. Install Dependencies.**

Next, we need to install the project dependencies, which are listed in `package.json`.

```bash
npm install # or yarn install
```

**Step 3: Create an OAuth App on GitHub**

Head over to [GitHub OAuth apps](https://github.com/settings/developers) and create a new OAuth app. Name it what you like but you'll need to specify a callback URL, which should be something like:

```bash
https://localhost:5000/auth/callback/github
```

The default port for our app is `5000`, but you may need to update this if your setup uses a different port or if you're hosting your app somewhere besides your local machine.

**Step 4: Update environment variables and run the Server.**

Create a new file named `.env` by duplicating `.env.sample`. Update the new file with the GitHub credentials. It should look similar to this:

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
YOUTUBE_API_KEY=""
```

You replace the GitHub and YouTube Data API v3 credentials here and update the database URL.

Now we're ready to start our server which is as simple as:

```bash
npm start
```

Open http://localhost:5000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

## What's Included?

- [Express](https://expressjs.com/) - A minimal web framework for Node.js web applications
- [Sequelize](http://docs.sequelizejs.com/) - A promise-based ORM for Node.js that supports PostgreSQL, MySQL, and SQLite.
- [Bootstrap 4](https://getbootstrap.com/) - An open source design system for HTML, CSS, and JS.
- [Handlebars](https://handlebarsjs.com/) - A popular templating language for building layouts.

## Code of Conduct

We enforce a Code of Conduct for all maintainers and contributors of this Guide. Read more in [CONDUCT.md](./docs/CONDUCT.md).

## License

Licensed under the [MIT License](./LICENSE).
