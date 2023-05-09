import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 19px 0;
`;

const StyledMiniInfo = styled.div`
  display: flex;
  gap: 12px;
`;
const StyledLink = styled.div``;
const StyledImageContainer = styled.div`
  background: #c4c4c4;
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;
const StyledText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileItem = ({ linkText, linkTo, small = false }) => {
  return (
    <StyledProfileItem>
      <StyledMiniInfo>
        <StyledImageContainer>
          <img src='#' alt='avatar' />
        </StyledImageContainer>
        <StyledText>
          <strong>alexeev</strong>
          <small>Yuri Alexeev</small>
        </StyledText>
      </StyledMiniInfo>
      <StyledLink>
        <Link to={linkTo}>{linkText}</Link>
      </StyledLink>
    </StyledProfileItem>
  );
};

export default ProfileItem;
