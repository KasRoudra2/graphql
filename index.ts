import express from "express";
import cors from "cors";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { graphqlHTTP } from "express-graphql";
import { books, authors } from "./data.json";

const app = express();
const port = process.env.PORT || 5000;

const authorType = new GraphQLObjectType({
  name: "AuthorQuery",
  description: "This is the query of authors",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    books: {
      type: new GraphQLList(bookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const bookType = new GraphQLObjectType({
  name: "BookQuery",
  description: "This is the query of booklist",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: authorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

const query = new GraphQLObjectType({
  name: "RootQuery",
  description: "RootQuery",
  fields: () => ({
    book: {
      type: bookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (_, args) => {
        return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: authorType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (_, args) => authors.find((author) => author.id === args.id),
    },
    books: {
      type: new GraphQLList(bookType),
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve: () => authors,
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Changing data",
  fields: () => ({
    addBook: {
      type: bookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (_, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

app.use(cors());

app.use(
  "/",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`GraphQL Server started at port ${port}`);
});
