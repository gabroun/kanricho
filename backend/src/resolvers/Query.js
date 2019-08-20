const { forwardTo } = require("prisma-binding");
const Query = {
  boards: forwardTo("db"),
  board: forwardTo("db"),
  list: forwardTo("db"),
  card: forwardTo("db")
  //   async boards(parent, args, ctx, info) {
  //     const boards = await ctx.db.query.boards();
  //     return boards;
  //   }
};

module.exports = Query;
