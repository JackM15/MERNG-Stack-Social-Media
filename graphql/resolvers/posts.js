const Post = require("../../models/Post")

//graphql posts resolvers
module.exports = {
  Query: {
    async getPosts() {
      try {
        //get all posts from DB using Mongoose
        const posts = await Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
