const { AuthenticationError, UserInputError } = require("apollo-server")
const Post = require("../../models/Post")
const checkAuth = require("../../util/check-auth")

//graphql posts resolvers
module.exports = {
  Query: {
    async getPosts() {
      try {
        //get all posts from DB using Mongoose in order
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID")
        }
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error("Post not found!")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      //check if user is authenticated to create the post by getting user from the context
      const user = checkAuth(context)

      //create the post object using the body (destructured above) and the user
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      })

      //Save the post object to the DB using mongoose
      const post = await newPost.save()

      //return post
      return post
    },

    async deletePost(_, { postId }, context) {
      //check if user is authenticated
      const user = checkAuth(context)
      //get the post
      try {
        const post = await Post.findById(postId)
        //check if they own the post or created it before allowing deletion
        if (user.username === post.username) {
          await post.delete()
          return "Post Deleted Successfully"
        } else {
          throw new AuthenticationError("Action not allowed!")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context)

      //find post
      const post = await Post.findById(postId)

      //if it exists
      if (post) {
        //see if user has already liked the post
        if (post.likes.find((like) => like.username === username)) {
          //post already liked, remove like
          post.likes = post.likes.filter((like) => like.username !== username)
        } else {
          //not liked, add like
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }
        //save to db
        await post.save()
        return post
      } else {
        throw new UserInputError("Post not found!")
      }
    },
  },
}
