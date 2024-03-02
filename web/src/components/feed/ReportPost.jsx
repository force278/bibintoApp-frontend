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
  mutation banUser($id: Int!) {
    banUser(id: $id) {
      ok
      error
    }
  }
`

const SKIP_MUTATION = gql`
  mutation skipReport($id: Int!) {
    skipReport(id: $id) {
      ok
      error
    }
  }
`

function ReportPost({ id, user, file }) {
  const [ban] = useMutation(BAN_MUTATION, { variables: { id: user.id } })
  const [skip] = useMutation(SKIP_MUTATION, { variables: { id } })

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
            src="verifiedIcon.svg"
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
          <PostAction onClick={skip}>
            <FontAwesomeIcon
              style={{
                color: "inherit",
                fontSize: "27px",
                transition: "0.5s ease",
              }}
              icon={faBackward}
            />
          </PostAction>
          <PostAction onClick={ban}>
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
