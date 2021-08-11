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
  //modifiers for types (get data from parent)
  //calculating count of likes and comments
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
}
