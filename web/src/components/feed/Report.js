import {
  PostAction,
  PostContainer,
  PostContent,
  PostFooter,
  PostHeader,
  Username,
} from "./Post"
import { Link } from "react-router-dom"
import Avatar from "../Avatar"
import React, { useState } from "react"
import {
  faHeart as SolidHeart,
  faHeartBroken,
  faHand,
  faBackward,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { gql, useMutation } from "@apollo/client"
import defaultAvatar from "../../assets/img/DefaultAvatar.png"

const BAN_MUTATION = gql`
  mutation ban($id: Int!) {
    ban(id: $id, value: $value) {
      ok
      error
    }
  }
`

export function Report({ id, user, file }) {
  return (
    <PostContainer key={id}>
      <PostHeader>
        <Link to={`/${user?.username}`}>
          {user && user.avatar ? (
            <Avatar url={user?.avatar} lg={true} />
          ) : (
            <Avatar url={defaultAvatar} lg={true} />
          )}
        </Link>
        <Link to={`/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
        {user.official ? (
          <img
            src="official.png"
            alt="official"
            style={{
              width: "25px",
            }}
          ></img>
        ) : null}
      </PostHeader>
      <PostContent src={file} />
      <PostFooter>
        <div className="d-flex justify-content-around">
          <PostAction onClick={addLike}>
            <FontAwesomeIcon
              style={{
                color: isLiked ? "#F0355B" : "inherit",
                fontSize: "27px",
                transition: "0.5s ease",
              }}
              icon={faBackward}
            />
          </PostAction>
          <PostAction onClick={addDislike}>
            <FontAwesomeIcon
              style={{
                opacity: isDisliked ? 1 : 0.3,
                fontSize: "27px",
                transition: "0.5s ease",
              }}
              icon={faHand}
            />
          </PostAction>
        </div>
      </PostFooter>
    </PostContainer>
  )
}
