const jsonServer = require('json-server');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

const server = jsonServer.create()
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use body-parser to parse JSON bodies
server.use(bodyParser.json());

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use the custom authentication middleware
server.use(middleware);

// Use default router
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running on port 3000');
});
