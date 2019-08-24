// this file connects to the remote prisma DB and give us the ability to query with JS
const { Prisma } = require("prisma-binding");
require("dotenv").config({ path: ".env" });

const db = new Prisma({
  typeDefs:  __dirname + '/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;
