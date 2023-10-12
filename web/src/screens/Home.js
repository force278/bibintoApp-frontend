import React from "react";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import RecomendationAside from "../components/aside/RecomendationAside";
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments";
import { RecommendationPost } from "../components/feed/RecommendationPost";

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
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${POST_FRAGMENT}
  ${COMMENTS_FRAGMENT}
`;

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
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${POST_FRAGMENT}
  ${COMMENTS_FRAGMENT}
`;

const StyledSubHeader = styled.div`
  font-weight: 700;
  font-size: 20px;
  font-family: Nexa, sans-serif;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  padding: 19px 0;
  color: rgba(0, 0, 0, 0.40);
  &:hover {
    cursor: pointer;
  }

  .active {
    color: #000;
  }
`;

function Home() {
  const useActiveLink = (path) => {
    const location = useLocation();
    return location.pathname === path;
  }
  const isRecommendationsActive = useActiveLink('/recommendations');
  const isSubscriptionsActive = useActiveLink('/');


  const { data } = useQuery(SEE_FEED_QUERY, {
    variables: { offset: 0 },
  });

  const data_rec = useQuery(SEE_REC_QUERY);
  /*
  useEffect(
    () => {
      const interval = setInterval(() => refetch({ offset: 0 }), 5000);

      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // empty array
  );
  */
  return (
    <>
      <PageTitle title='Лента' />
      <div className="d-flex justify-content-center">
        <div>
          <StyledSubHeader>
            <Link
              to='/'
              className={isSubscriptionsActive ? 'active' : ''}
            >
              Подписки
            </Link>
            <span className="ps-2 pe-2">
              <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12.5V1.5" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <Link
              to='/recommendations'
              className={isRecommendationsActive ? 'active' : ''}
            >
              Рекомендации
            </Link>
          </StyledSubHeader>
          <Switch>
            <Route exact path='/'>
              <div className="mobilePostContainer" style={{width:'585px'}}>
                {data?.seeFeed?.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </Route>
            <Route exact path='/recommendations'>
              <div className="mobilePostContainer" style={{width:'585px'}}>
                {data_rec?.data?.seeRec?.map((post) => (
                  <RecommendationPost key={post.id} {...post} />
                ))}
              </div>
            </Route>
          </Switch>
        </div>
        <RecomendationAside currentUsername="" />
      </div>
    </>
  );
}
export default Home;
