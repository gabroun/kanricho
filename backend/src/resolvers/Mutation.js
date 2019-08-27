const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const {promisify} = require('util')
const {makeAniceEmail, transport} = require('../mail')

const Mutations = {
  async createBoard(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    const board = await ctx.db.mutation.createBoard(
      {
        data: {
          // relationship between board and user
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
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
  async signin(parent, {email, password}, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({
      where: {email}
    });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // check if there password is correct
    const valid = bcrypt.compare(password, user.password);
    if(!valid) {
      throw new Error('Invalid password!');
    }
    // generate the JWT token
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // return the user
    return user;

  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return {
      message: 'GoodBye!'
    }
  },
  async requestReset(parent, args, ctx, info) {
    // check if this is a real user
    const user = await ctx.db.query.user({where: {email: args.email}});
    if(!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // set a reset token and expiry on that user
    const randomBytesPromisified = promisify(randomBytes)
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: {email: args.email},
      data: {resetToken, resetTokenExpiry}
    });
    // email them that reset token
      const mailRes = await transport.sendMail({
        from: 'malikgabroun@yahoo.co.uk',
        to: user.email,
        subject: 'Your password reset Token',
        html: makeAniceEmail(`Your password reset token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/resetpassword?resetToken=${resetToken}">Click here to reset</a>`)
      })

    // return message
    return {message: 'Thanks'}

  },
  async resetPassword(parent, args, ctx, info) {
    // check if passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Your password doesn't match");
    }
    // check if its a legit reset token
    // check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if(!user) {
      throw new Error('This token either invalid or expired');
    }
    // hash the new password
    const password = await bcrypt.hash(args.password, 10);
    // save the new password to the user and remove old resetToken field
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {email: user.email},
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    })
    // generate JWT
    const token = jwt.sign({userId: updatedUser.id}, process.env.APP_SECRET);

    // set the JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // return the new user
    return updatedUser;
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
