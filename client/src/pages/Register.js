import { gql, useMutation } from "@apollo/client"
import React, { useState, useContext } from "react"
import { Button, Form } from "semantic-ui-react"
import { useForm } from "../utils/hooks"
import { AuthContext } from "../context/auth"

export default function Register(props) {
  const [errors, setErrors] = useState({})
  const context = useContext(AuthContext)

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //if mutation is successful this is triggered
    update(_, result) {
      setErrors({})
      context.login(result.data.login)
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  //hoisted up
  function registerUser() {
    addUser()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

//GraphQL Mutation
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`
