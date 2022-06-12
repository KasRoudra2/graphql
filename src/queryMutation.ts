import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { bookType, authorType } from "./types";
import { books, authors } from "./assets/data.json";

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

export { query, mutation };
