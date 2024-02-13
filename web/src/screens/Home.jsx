import React, { useEffect } from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import Post from "../components/feed/Post"
import PageTitle from "../components/PageTitle"
import RecomendationAside from "../components/aside/RecomendationAside"
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments"
import { RecommendationPost } from "../components/feed/RecommendationPost"

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

const SEE_REC_QUERY = gql`
  query seeRec {
    seeRec {
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

const StyledSubHeader = styled.div`
  font-weight: 700;
  font-size: 20px;
  font-family: Nexa, sans-serif;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  padding: 19px 0;
  color: rgba(0, 0, 0, 0.4);
  &:hover {
    cursor: pointer;
  }

  .active {
    color: #000;
  }
`

const EmptyRec = styled.div`
  width: 300px;
  height: 150px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
`

function Home() {
  const useActiveLink = (path) => {
    const location = useLocation()
    return location.pathname === path
  }
  const isRecommendationsActive = useActiveLink("/recommendations")
  const isSubscriptionsActive = useActiveLink("/")

  const { subscribeToMore, data } = useQuery(SEE_FEED_QUERY, {
    variables: { offset: 0 },
  })

  const data_rec = useQuery(SEE_REC_QUERY)

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUB_POST_UPDATES,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newPost = subscriptionData.data.postUpdates
        return Object.assign({}, prev, {
          seeFeed: [newPost, ...prev.seeFeed],
        })
      },
    })

    return () => {
      unsubscribe()
    }
  }, [subscribeToMore])

  return (
    <>
      <PageTitle title="Лента" />
      <div className="d-flex justify-content-center">
        <div>
          <StyledSubHeader>
            <Link to="/" className={isSubscriptionsActive ? "active" : ""}>
              Подписки
            </Link>
            <span className="ps-2 pe-2">
              <svg
                width="2"
                height="14"
                viewBox="0 0 2 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.5V1.5"
                  stroke="black"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <Link
              to="/recommendations"
              className={isRecommendationsActive ? "active" : ""}
            >
              Рекомендации
            </Link>
          </StyledSubHeader>
          <Switch>
            <Route exact path="/">
              <div className="mobilePostContainer" style={{ width: "585px" }}>
                {data?.seeFeed?.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </Route>
            <Route exact path="/recommendations">
              {data_rec?.data?.seeRec?.lenght !== 0 ? (
                <div className="mobilePostContainer" style={{ width: "585px" }}>
                  {data_rec?.data?.seeRec?.map((post) => (
                    <RecommendationPost key={post.id} {...post} />
                  ))}
                </div>
              ) : (
                <div
                  className="mobilePostContainer d-flex align-items-center justify-content-center flex-column"
                  style={{ width: "585px" }}
                >
                  <img
                    src="done.svg"
                    alt="done"
                    style={{ width: "80px" }}
                  ></img>
                  <h1 className="fs-5">На этом пока всё</h1>
                </div>
              )}
            </Route>
          </Switch>
        </div>
        <RecomendationAside currentUsername="" />
      </div>
    </>
  )
}
export default Home
