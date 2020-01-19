const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const graphiqlSchema = require("./graphql/schema/index");
const graphiqlResolvers = require("./graphql/resolvers/index");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphiqlSchema,
    rootValue: graphiqlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    // `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}`
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@fineteacher-ytvmg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
