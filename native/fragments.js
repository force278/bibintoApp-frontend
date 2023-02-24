import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Photo {
    id
    file
    likes
    commentsNumber
  }
`;

export const COMMENTS_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
    }
    payload
    createdAt
    isMine
  }
`;

export const USERS_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isMe
    isFollowing
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PostFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${POST_FRAGMENT}
`;

export const DIALOG_FRAGMENT = gql`
  fragment DialogParts on Dialog {
    id
    users {
      id
      username
      avatar
    }
    unreadTotal
  }
`;
