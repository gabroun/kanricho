const { GraphQLServer } = require("graphql-yoga");
const { ApolloServer } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");
const path = require("path");
const { importSchema } = require("graphql-import");
require("dotenv").config({ path: ".env" });

const typeDefs = importSchema(path.resolve(__dirname + "/schema.graphql"));

// create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query
    },
    context: req => ({ ...req, db }),
    playground: true,
    introspection: true
  });
}

module.exports = createServer;
