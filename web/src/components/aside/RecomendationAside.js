import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import ProfileItem from "./ProfileItem"

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  a {
    color: blue;
    cursor: pointer;
  }
`

const StyledCopyright = styled.small`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #8e8e8e;
  margin-top: 15px;
`

const RecomendationAside = ({ currentUsername }) => {
  return (
    <div className="d-none flex-column aside">
      <ProfileItem
        linkText="Редактировать"
        linkTo="/accountEditProfile"
        name="Разрабатывается..."
        username="Мой профиль"
      />
      <StyledLinks>
        <h2>Рекомендуемые профили</h2>
        <Link to="/recomended-profiles">Все</Link>
      </StyledLinks>
      <ProfileItem
        linkText="Подписаться"
        linkTo={`/users/${currentUsername}/edit`}
        name="Konstantin Karpov"
        username="konstantin__karpov"
        small
      />
      <ProfileItem
        linkText="Подписаться"
        linkTo={`/users/${currentUsername}/edit`}
        name="Sylanty Sylanty"
        username="silanty013"
        small
      />
      <ProfileItem
        linkText="Подписаться"
        linkTo={`/users/${currentUsername}/edit`}
        name="Pavel Durov"
        username="durov_official"
        small
      />
      <StyledCopyright>BIBINTO © 2023</StyledCopyright>
    </div>
  )
}

export default RecomendationAside
