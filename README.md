# React Ratings

This is a React Ratings app which uses code from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

## To use

Simple server will serve static files from `public/` and handle requests to `/api/ratings` to fetch or add data. Start a node server:

### Node

```sh
npm install
node server.js
```

And visit <http://localhost:3000/>. Try opening multiple tabs!

## Changing the port

You can change the port number by setting the `$PORT` environment variable before invoking any of the scripts above, e.g.,

```sh
PORT=3001 node server.js
```
