import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import RecomendationAside from "../components/aside/RecomendationAside";
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments";

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

const StyledHomeContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 23px;

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
    column-gap: unset;
  }
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
  const [activeTab, setActiveTab] = useState(0);

  const handleClickSubscribe = () => {
    if (activeTab === 0) return;
    setActiveTab(0);
  };

  const handleClickRecomenations = () => {
    if (activeTab === 1) return;
    setActiveTab(1);
  };

  const { data, refetch } = useQuery(SEE_FEED_QUERY, {
    variables: { offset: 0 },
  });

  useEffect(
    () => {
      const interval = setInterval(() => refetch({ offset: 0 }), 5000);

      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // empty array
  );

  return (
    <>
      <PageTitle title='Лента' />
      <StyledHomeContainer>
        <div>
          <StyledSubHeader>
            <Link
              to='/'
              onClick={handleClickSubscribe}
              className={`${activeTab === 0 ? "active" : ""}`}
            >
              Подписки
            </Link>
            <span className="ps-2 pe-2">
              <svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12.5V1.5" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <Link
              to='/recomendations'
              onClick={handleClickRecomenations}
              className={`${activeTab === 1 ? "active" : ""}`}
            >
              Рекомендации
            </Link>
          </StyledSubHeader>
          <Switch>
            <Route exact path='/'>
              <>
                {data?.seeFeed?.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </>
            </Route>
            <Route exact path='/recomendations'>
              <></>
            </Route>
          </Switch>
        </div>
        <RecomendationAside currentUsername='alexeev' />
      </StyledHomeContainer>
    </>
  );
}
export default Home;
