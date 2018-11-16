to get the dao working in production: use the configSample.js with the correct credentials and rename it to "pool.js". "pool.js" should be in the root folder.

## Client: run tests and start

From the top-level repository folder:

```sh
cd client
npm install
npm test
npm start
```

From the top-level repository folder:

```sh
cd server
npm install
npm test
npm start
```

## Open application

http://localhost:3000/#/

## For those interested: production-mode

To build the client for production/deployment:

```sh
npm run build-prod
```

To run the server in production mode:

```sh
npm run start-prod
```
