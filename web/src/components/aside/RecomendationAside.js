import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileItem from "./ProfileItem";

const StyledAside = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-top: 65px;
  border-radius: 10px;
  max-height: 390px;
  position: fixed;
  right: 372px;
  
`;

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  a {
    color: blue;
    cursor: pointer;
  }
`;

const StyledCopyright = styled.small`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #8e8e8e;
  margin-top: 15px;
`;

const RecomendationAside = ({ currentUsername }) => {
  return (
    <StyledAside>
      <ProfileItem
        linkText='Редактировать'
        linkTo={`/users/${currentUsername}/edit`}
        name='Yuri Alexeev'
        username={currentUsername}
      />
      <StyledLinks>
        <h2>Рекомендуемые профили</h2>
        <Link to='/recomended-profiles'>Все</Link>
      </StyledLinks>
      <ProfileItem
        linkText='Подписаться'
        linkTo={`/users/${currentUsername}/edit`}
        name='Konstantin Karpov'
        username='konstantin__karpov'
        small
      />
      <ProfileItem
        linkText='Подписаться'
        linkTo={`/users/${currentUsername}/edit`}
        name='Sylanty Sylanty'
        username='silanty013'
        small
      />
      <ProfileItem
        linkText='Подписаться'
        linkTo={`/users/${currentUsername}/edit`}
        name='Pavel Durov'
        username='durov_official'
        small
      />
      <StyledCopyright>BIBINTO © 2023</StyledCopyright>
    </StyledAside>
  );
};

export default RecomendationAside;
