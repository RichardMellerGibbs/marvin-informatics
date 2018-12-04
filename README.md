Marvin Informatics

React app with node server and mongo database (MERN) stack.

Requires a mongo connection either locally or remotely - see config/keys_prod.js

If running the app locally:
npm install
start the database (connection via config/keys_dev.js ** not supplied**) first
and then in a separate session run "npm run dev" to start both server and client

In production there is no client server as the static assets are served by the node server.

Production build is via "npm run deploy-build"
