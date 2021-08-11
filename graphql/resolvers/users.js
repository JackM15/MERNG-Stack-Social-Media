require("dotenv").config()
const { UserInputError } = require("apollo-server")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators")

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  )
}

//Mutation format for passed in are (parent, args, context, info)
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      //check for valid input and display errors if any
      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }

      //get user from db
      const user = await User.findOne({ username })

      //check if they exist
      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("User not found", { errors })
      }

      //check if their password is correct
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = "Wrong Credentials"
        throw new UserInputError("Wrong Credentials", { errors })
      }

      //if correct, send token back
      const token = generateToken(user)
      //return the response in json format with the token
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        })
      }
      //Make sure user doesnt exist already
      const user = await User.findOne({ username })
      if (user) {
        //throw error using apollo built in error, return a payload for our web app
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        })
      }
      //hash password for DB
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })
      //save the user to the DB
      const res = await newUser.save()

      //generate a JWT Token
      const token = generateToken(res)

      //return the response in json format with the token
      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
