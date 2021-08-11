const postsResolvers = require("./postsResolvers")
const usersResolvers = require("./usersResolvers")

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
}
