import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { books, authors } from "./assets/data.json";

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

export { bookType, authorType };
