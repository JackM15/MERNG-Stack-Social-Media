import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Button, Confirm, Icon, Popup } from "semantic-ui-react"

//Fetch posts so we can remove the post from the cache
import { FETCH_POSTS_QUERY } from "../utils/graphql"

export default function DeleteButton({ postId, commentId, callback }) {
  //delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false)

  //select which mutation to use if comment or post based on props above
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      if (!commentId) {
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
      }

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
      commentId,
    },
  })

  return (
    <>
      <Popup
        content={commentId ? "Delete Comment" : "Delete Post"}
        inverted
        trigger={
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
        }
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  )
}

//GraphQL Mutations
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`
