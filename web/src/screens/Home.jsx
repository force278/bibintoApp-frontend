import React, { useEffect } from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import Post from "../components/feed/Post"
import PageTitle from "../components/PageTitle"
import RecomendationAside from "../components/aside/RecomendationAside"
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments"
import { RecommendationPost } from "../components/feed/RecommendationPost"
import IconLogo from "../assets/img/bibinto.svg"

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
        isFollowing
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

const MobLogoWrap = styled.div`
  margin: 10px auto;
  max-width: 72px;
  object-fit: contain;
  img {
    width: 100%;
  }
`

const StyledSubHeader = styled.div`
  // display: grid;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  color: rgba(0, 0, 0, 0.4);
  padding: 38px 20px 28px 20px;
  // grid-template-columns: 1fr auto 1fr;
  .active {
    color: #000;
  }
  @media (max-width: 768px) {
    padding: 12px 20px 20px 20px;
    a {
      font-size: 18px;
      line-height: 100%;
    }
  }
`
const EmptyFeed = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 16px;
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
      <div className="isMobile">
        <MobLogoWrap>
          <img src={IconLogo} alt="" />
        </MobLogoWrap>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <StyledSubHeader>
            <Link
              to="/"
              // style={{ justifySelf: "end" }}
              className={isSubscriptionsActive ? "active" : ""}
            >
              Подписки
            </Link>
            <span className="ps-2 pe-2">
              <svg
                width="1"
                height="14"
                viewBox="0 0 1 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.5V1.5"
                  stroke="#D8D8DC"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <Link
              to="/recommendations"
              // style={{ justifySelf: "start" }}
              className={isRecommendationsActive ? "active" : ""}
            >
              Рекомендации
            </Link>
          </StyledSubHeader>
          <Switch>
            <Route exact path="/">
              <div className="mobilePostContainer" style={{ width: "585px" }}>
                {data && data.seeFeed.length > 0 ? (
                  data.seeFeed.map((post) => <Post key={post.id} {...post} />)
                ) : (
                  <EmptyFeed>Раздел подписок пока пуст</EmptyFeed>
                )}
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
