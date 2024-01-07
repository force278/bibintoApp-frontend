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
import { faBackward, faHandPaper } from "@fortawesome/free-solid-svg-icons"
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

function ReportPost({ id, user, file }) {
  console.log(user)
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
          <PostAction>
            <FontAwesomeIcon
              style={{
                color: "inherit",
                fontSize: "27px",
                transition: "0.5s ease",
              }}
              icon={faBackward}
            />
          </PostAction>
          <PostAction>
            <FontAwesomeIcon
              style={{
                opacity: 1,
                fontSize: "27px",
                transition: "0.5s ease",
                color: "#dc3545",
              }}
              icon={faHandPaper}
            />
          </PostAction>
        </div>
      </PostFooter>
    </PostContainer>
  )
}

export default ReportPost
