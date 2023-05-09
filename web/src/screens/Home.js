import React, { useState } from "react";
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
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  color: rgba(0, 0, 0, 0.4);
  padding: 19px 0;

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

  const { data } = useQuery(SEE_FEED_QUERY, { variables: { offset: 0 } });

  return (
    <>
      <PageTitle title='Лента' />
      <StyledHomeContainer>
        <div>
          <StyledSubHeader>
            <span
              onClick={handleClickSubscribe}
              className={`${activeTab === 0 ? "active" : ""}`}
            >
              Подписки
            </span>{" "}
            |{" "}
            <span
              onClick={handleClickRecomenations}
              className={`${activeTab === 1 ? "active" : ""}`}
            >
              Рекомендации
            </span>
          </StyledSubHeader>
          <>
            {data?.seeFeed?.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </>
        </div>
        <RecomendationAside />
      </StyledHomeContainer>
    </>
  );
}
export default Home;
