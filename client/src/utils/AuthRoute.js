//opposite to a protected route that redirects to home page on routes that are not meant to be viewed by logged in users

import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { AuthContext } from "../context/auth"

function AuthRoute({ component: Component }, ...rest) {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
