const postsResolvers = require("./postsResolvers")
const usersResolvers = require("./usersResolvers")
const commentsResolvers = require("./commentsResolvers")

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
}
