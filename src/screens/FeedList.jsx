import { useEffect, useState } from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import Post from "../components/feed/Post"
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments"

const EmptyFeed = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 16px;
`

const SEE_FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PostFragment
      caption
      comments {
        ...CommentFragment
      }
      user {
        username
        avatar
        official
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${POST_FRAGMENT}
  ${COMMENTS_FRAGMENT}
`

const SUB_POST_UPDATES = gql`
  subscription {
    postUpdates {
      ...PostFragment
      caption
      comments {
        ...CommentFragment
      }
      user {
        username
        avatar
        official
      }
      createdAt
      isMine
      isLiked
      isDisliked
    }
  }
  ${POST_FRAGMENT}
  ${COMMENTS_FRAGMENT}
`

function FeedList() {
  const { data, loading, error } = useQuery(SEE_FEED_QUERY, {
    variables: { offset: 0 },
  })

  if (loading) return <EmptyFeed>Загрузка...</EmptyFeed>
  if (error) return <EmptyFeed>Ошибка загрузки</EmptyFeed>

  return (
    <>
      {data && data.seeFeed.length > 0 ? (
        data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <EmptyFeed>Раздел подписок пока пуст</EmptyFeed>
      )}
    </>
  )
}

export default FeedList
