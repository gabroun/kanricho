# Kanricho - WIP

Kanricho is a task management app.

👉 Checkout the live website [here](https://kanricho.com/)

## Features

- Boards, lists, cards create, update and delete content by the specific user.
- Account creation and project association with said account.

## Motivation

This app was created to experiement with the tech stack and as a tool that I can use with specific features based on my requirements.

### Tech Stack

![](https://imgur.com/ousyQaC.png)

- React using **Next.js** for server side rendering, routing and tooling.
- **Styled Compontents** for styling.
- **React Apollo** to iterface with Apollo Client.
- **Apollo Client** to perform GraphQL Mutations and fetching Queries, Caching data and using error/loading UI states.
- **GraphQL Yoga** to implement Query/Mutation resolvers, sending emails and performing JWT authenication.
- **Prisma** to use CRUD APIs for MySQL database, schema definition, data relationships, queried data from Yoga server.

### Features to be added

- Status, Priority, Due Date fields for cards.
- Drag and Drop cards and lists.
- Card off-canvas block to have WYSIWYG editer and comments as part of card content.
- Calendar visualisation for cards with due date.
- Email template for account creation and password requesting/resetting.
