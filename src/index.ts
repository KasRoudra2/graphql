import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./scema";

const app = express();
const port = process.env.PORT || 5000;

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
