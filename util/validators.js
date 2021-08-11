//Validate user registration
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}
  //validate username, not empty
  if (username.trim() === "") {
    errors.username = "Username must not be empty!"
  }

  //validate email for empty and proper regex
  if (email.trim() === "") {
    errors.email = "Email must not be empty!"
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address!"
    }
  }

  //validate passwords for empty or matching confirmed
  if (password.trim() === "") {
    errors.password = "Password must not be empty!"
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match"
  }

  //return errors, set valid to true if the errors object has less than 1 error
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

//Validate user login
module.exports.validateLoginInput = (username, password) => {
  const errors = {}

  //validate username, not empty
  if (username.trim() === "") {
    errors.username = "Username must not be empty!"
  }

  //validate password, not empty
  if (password.trim() === "") {
    errors.password = "Password must not be empty!"
  }

  //return errors, set valid to true if the errors object has less than 1 error
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
