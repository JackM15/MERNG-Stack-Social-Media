import { gql, useMutation } from "@apollo/client"
import React from "react"
import { Button, Form } from "semantic-ui-react"

import { useForm } from "../utils/hooks"
import { FETCH_POSTS_QUERY } from "../utils/graphql"

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      //read data from apollo cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      //write the data back to the fetch posts query to display on page
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      values.body = ""
    },
    //get the queries again on the page for updating without refresh
    refetchQueries: (refetchPosts) => [{ query: FETCH_POSTS_QUERY }],
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Post Message Here'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

//GraphQL Mutation
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`
