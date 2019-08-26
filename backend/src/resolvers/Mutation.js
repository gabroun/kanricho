const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Mutations = {
  async createBoard(parent, args, ctx, info) {
    // todo check if user is logged in

    const board = await ctx.db.mutation.createBoard(
      {
        data: {
          ...args
        }
      },
      info
    );

    return board;
  },
  updateBoard(parent, args, ctx, info) {
    // take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateBoard(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateList(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateList(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateCard(paremt, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateCard(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteBoard(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const board = await ctx.db.query.board({ where }, `{id, title}`);
    // check if they own/have permission
    // todo
    // delete it
    return ctx.db.mutation.deleteBoard({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    // create the user in the database
     const user = await ctx.db.mutation.createUser({
       data: {
         ...args,
         password,
         permissions: {set: ['USER']}
       }
     }, info);
     // create the JWT for them
     const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);


     // we set the jwt as cookie on the response
     ctx.response.cookie('token', token, {
       httpOnly: true,
       maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
     });

     // we return the user to the browser
     return user;
  },
  async createList(parent, args, ctx, info) {
    const list = await ctx.db.mutation.createList(
      {
        data: {
          board: {
            connect: {
              id: args.board.connect.id
            }
          },
          ...args
        }
      },
      info
    );

    return list;
  },
  async createCard(parent, args, ctx, info) {
    const card = await ctx.db.mutation.createCard(
      {
        data: {
          list: {
            connect: {
              id: args.list.connect.id
            }
          },
          ...args
        }
      },
      info
    );

    return card;
  },
  async deleteList(parent, args, ctx, info) {
    const where = { id: args.id };
    const list = await ctx.db.query.list({ where }, `{id, title}`);
    // todo. check if they own/have permission
    return ctx.db.mutation.deleteList({ where }, info);
  },
  async deleteCard(parent, args, ctx, info) {
    const where = { id: args.id };
    const card = await ctx.db.query.card({ where }, `{id, content}`);
    // todo. check if they own/have permission
    return ctx.db.mutation.deleteCard({ where }, info);
  }
};

module.exports = Mutations;
