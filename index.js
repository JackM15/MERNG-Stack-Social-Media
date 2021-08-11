require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

//GraphQL Type Definitions
const typeDefs = require("./graphql/typeDefs")
//GraphQL resolvers (whats returned when user queries)
const resolvers = require("./graphql/resolvers")

//Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

//Connect to database then run graphql server
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful")
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}.`)
  })
