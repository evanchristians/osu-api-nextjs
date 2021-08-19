# Osu! APIv2 consumption with Next.js

This is an example implementation of consuming data from the [Osu! APIv2](https://osu.ppy.sh/docs/index.html) with JavaScript, which can maybe be used as a reference or starting point for building your own app with the data since I could not find much on the API besides the somewhat outdated docs [here](https://osu.ppy.sh/docs/index.html).

## How to use

This app was built with [Next.js](https://nextjs.org/) a FullStack React framework which allows us to build our UI & write our API routes so we can hide our API keys from the browser.

### Installation

Since we're using `Next.js` we'll need [npm](https://www.npmjs.com/) to run our app.

With `npm` installed & once you've cloned this repository, `cd` into it and run the following command:

```bash
npm install
```

### Environment Variables

We could run `npm run dev` in our project folder to get our app running, however we'll not be able to get data from the Osu! API since it requires a `Client ID` & a `Client Secret` to generate a token to authenticate our requests (see `lib/authMiddleware.js`).

These can be generated on your [Osu! Account Settings](https://osu.ppy.sh/home/account/edit) page.

Once you've generated your `Client ID` & `Client Secret`, navigate to this project's root directory and create a `.env.local` file with your `Client ID` & `Client Secret` in the format:

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

`Next.js` will be able to read these keys from the API routes using `process.env.CLIENT_ID` & `process.env.CLIENT_SECRET` without exposing them to the browser.

Once you're ready to deploy you'll need to add these keys as `environment variables` in your hosting preferences.

### Running Our App

Now you can run the app with the following command:

```
npm run dev
```

And access it at http://localhost:3000.
