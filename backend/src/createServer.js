const { GraphQLServer } = require("graphql-yoga");
const { ApolloServer } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

require("dotenv").config({ path: ".env" });

// create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: `${__dirname  }/schema.graphql`,
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
