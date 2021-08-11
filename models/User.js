const { model, Schema } = require("mongoose")

//user schema, no need to force requirements as graphql can handle it
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
})

//export the db model (Name, schema)
module.exports = model("User", userSchema)
