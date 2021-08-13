import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Button, Confirm, Icon } from "semantic-ui-react"

//Fetch posts so we can remove the post from the cache
import { FETCH_POSTS_QUERY } from "../utils/graphql"

export default function DeleteButton({ postId, callback }) {
  //delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)

      //get posts data
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })

      //remove data and write to the cache/database
      let newData = data.getPosts.filter((p) => p.id !== postId)
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          newData,
        },
      })

      //if callback is passed in, call it (single post page redirect)
      if (callback) {
        callback()
      }
    },
    onError(err) {
      console.error(err.message)
    },
    //get the queries again on the page for updating without refresh
    refetchQueries: (refetchPosts) => [{ query: FETCH_POSTS_QUERY }],
    variables: {
      postId,
    },
  })

  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => {
          setConfirmOpen(true)
        }}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

//GraphQL Mutation
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
