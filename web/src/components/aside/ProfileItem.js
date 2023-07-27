import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


//Todo:styled-component переписать на bootstrap и в отдельный файл с css стилям, чтобы был порядок
const StyledProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.small ? "12.5px" : "19px")} 0;
  gap: 12px;
`;

const StyledMiniInfo = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

const StyledLink = styled.div`
  display: flex;
  color: blue;
  font-size: 12px;
  cursor: pointer;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  border-radius: 50%;
  width: ${(props) => (props.small ? "36px" : "56px")};
  height: ${(props) => (props.small ? "36px" : "56px")};
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  strong {
    font-weight: 600;
    font-size: ${(props) => (props.small ? "13px" : "14px")};
  }

  small {
    font-size: 12px;
    color: gray;
    letter-spacing: 0px;
  }
`;

const StyledAvatar = styled.div``;

const ProfileItem = ({ linkText, linkTo, name, username, small = false }) => {
  return (
    <StyledProfileItem small={small}>
      <StyledMiniInfo>
        <StyledImageContainer small={small}>
          {/* <img src='#' alt='avatar' /> */}
          <StyledAvatar />
        </StyledImageContainer>
        <StyledText small={small}>
          <strong>{username}</strong>
          <small>{name}</small>
        </StyledText>
      </StyledMiniInfo>
      <StyledLink>
        <Link to={linkTo}>{linkText}</Link>
      </StyledLink>
    </StyledProfileItem>
  );
};

export default ProfileItem;
