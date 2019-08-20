// const cookieParser = require("cookie-parser");
require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// todo use express middleware to handle cookies (JWT)
// server.express.use(cookieParser());
// todo use express middleware to populate current user

// start it
// server.start(
//   {
//     // cors: {
//     //   credentials: true,
//     //   origin: process.env.FRONTEND_URL
//     // }
//   },
//   deets => {
//     console.log(`server is running on port http://localhost:${deets.port}`);
//   }
// );

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
