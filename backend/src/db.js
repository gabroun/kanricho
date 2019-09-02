// this file connects to the remote prisma DB and give us the ability to query with JS
const { Prisma } = require("prisma-binding");
require("dotenv").config({ path: ".env" });
const db = new Prisma({
  typeDefs:   `${__dirname  }/schema_prep.graphql`,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;
