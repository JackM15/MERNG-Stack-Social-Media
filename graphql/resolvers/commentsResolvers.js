const { UserInputError, AuthenticationError } = require("apollo-server")
const Post = require("../../models/Post")
const checkAuth = require("../../util/check-auth")

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      //check we are authorised
      const { username } = checkAuth(context)

      //check user entered a valid body (not empty)
      if (body.trim() === "") {
        throw UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty!",
          },
        })
      }

      //get the post
      const post = await Post.findById(postId)

      //if post exists
      if (post) {
        //add new comment to top/front of comments in the post object
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        })

        //save the post
        await post.save()
        //return it
        return post
      } else {
        throw new UserInputError("Post not found")
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        //delete comment by index
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)

        //if the user owns the comment they can delete it
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError("Action not allowed!")
        }
      } else {
        throw new UserInputError("Post not found.")
      }
    },
  },
}
