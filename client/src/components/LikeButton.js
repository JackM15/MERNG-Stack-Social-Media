import { gql, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon, Label, Button, Popup } from "semantic-ui-react"

export default function LikeButton({ user, post: { likes, id, likeCount } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  const likeButton = user ? (
    liked ? (
      <Popup
        content={"Unlike"}
        inverted
        trigger={
          <Button color='teal'>
            <Icon name='heart' />
          </Button>
        }
      />
    ) : (
      <Popup
        content={"Like"}
        inverted
        trigger={
          <Button color='teal'>
            <Icon name='heart' />
          </Button>
        }
      />
    )
  ) : (
    <Popup
      content={"Log in to like"}
      inverted
      trigger={
        <Button as={Link} to='/login' color='teal' basic>
          <Icon name='heart' />
        </Button>
      }
    />
  )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}

//graphql mutation
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`
