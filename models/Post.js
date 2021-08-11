const { model, Schema } = require("mongoose")

//Post schema, no need to force requirements as graphql can handle it
const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  //user relationship
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
})

//export the db model (Name, schema)
module.exports = model("Post", postSchema)
