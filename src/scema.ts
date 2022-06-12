import { GraphQLSchema } from "graphql";
import { query, mutation } from "./queryMutation";

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;