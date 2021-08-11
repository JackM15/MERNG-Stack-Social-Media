const { gql } = require("apollo-server")

//GraphQL Types
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`
module.exports = typeDefs
