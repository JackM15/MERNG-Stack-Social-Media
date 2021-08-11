const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (context) => {
  //context contains headers
  const authHeader = context.req.headers.authorization

  //if user sends the auth header with their request
  if (authHeader) {
    //check for jtw token on the auth header
    const token = authHeader.split("Bearer ")[1]
    //if token exists check that its valid, not expired
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return user
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token")
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'")
  }
  throw new Error("Authorization header must be provided")
}
