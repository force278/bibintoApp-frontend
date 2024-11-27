import { gql } from "@apollo/client"

export const MY_POST_FRAGMENT = gql`
  fragment MyPostFragment on Photo {
    id
    file
    likes
    isLiked
    comments {
      id
      user {
        avatar
        username
        official
      }
      payload
      createdAt
      isMine
    }
    commentsNumber
  }
`

export const POST_FRAGMENT = gql`
  fragment PostFragment on Photo {
    id
    file
    likes
    commentsNumber
  }
`

export const COMMENTS_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      avatar
      username
      official
    }
    payload
    createdAt
    isMine
  }
`
