const cookieParser = require("cookie-parser");
require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const db = require("./db");
const jwt = require('jsonwebtoken');
const server = createServer();

server.express.use(cookieParser());

// decode jwt to get the userId in each request
server.express.use((req, res, next) => {
  const {token} = req.cookies;

  if(token) {
    const {userId} = jwt.verify(token, process.env.APP_SECRET);
    // put the userId on the req for future requests to access
    req.userId = userId
  }
  next()
})
// todo use express middleware to populate current user


// start it
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`server is running on port http://localhost:${deets.port}`);
  }
);

// server.listen({ port: process.env.PORT }).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
