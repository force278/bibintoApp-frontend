import {
  More,
  Subscribe,
  PostHeaderRight,
  PostContainer,
  PostContent,
  PostFooter,
  PostHeader,
  Username,
} from "./Post"
import { Link } from "react-router-dom"
import Avatar from "../Avatar"
import more from "../../assets/img/post/more.svg"
// import Modal from "../modal/Modal"
import ModalContent from "../modal/ModalContent"
import React, { useEffect, useState } from "react"

import likeIcon from "../../assets/icons/like.svg"
import likeIconFill from "../../assets/icons/likeFill.svg"

import dislikeIcon from "../../assets/icons/dislike.svg"
import dislikeIconFill from "../../assets/icons/dislikeFill.svg"
import verifiedIcon from "../../assets/img/verifiedIcon.svg"

// import { faHeart } from "@fortawesome/free-regular-svg-icons"
// import {
//   faHeart as SolidHeart,
//   faHeartBroken,
// } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import defaultAvatar from "../../assets/img/DefaultAvatar.png"
import styled from "styled-components"
import useMe from "../../hooks/useMe"
import ReportPopup from "./ReportPopup"
import ModalAlert from "../modalAlert"
// import { useRef } from "react"
// import { useEffect } from "react"

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!, $value: Int!) {
    toggleLike(id: $id, value: $value) {
      ok
      error
    }
  }
`

export function RecommendationPost({
  id,
  user,
  file,
  isLiked,
  isDisliked,
  isMine,
}) {
  const client = useApolloClient()

  const [followed, setFollowed] = useState(user.isFollowing)
  const [reportPopup, setReportPopupShowed] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  const { data: userData } = useMe()

  useEffect(() => {
    modalAlert &&
      setTimeout(() => {
        setModalAlert(false)
      }, 2000)
  }, [modalAlert])

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result
    if (ok) {
      const fragmentId = `Photo:${id}`
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return isLiked ? !prev : prev
          },
          isDisliked(prev) {
            return isDisliked ? !prev : prev
          },
          likes(prev) {
            if (isLiked) {
              return isLiked ? prev : prev - 1
            } else if (isDisliked) {
              return isDisliked ? prev + 1 : prev
            }
          },
        },
      })
    }
  }

  const [activeModal, setActiveModal] = useState(false)
  const [addLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id, value: 10 },
    update: updateToggleLike,
  })
  const [addDislike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id, value: 1 },
    update: updateToggleLike,
  })

  const followUserCompleted = (data) => {
    const username = user.username
    if (!username) return
    const {
      followUser: { ok },
    } = data
    const { cache } = client
    if (!ok) return
    setFollowed(true)
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev + 1
        },
        isFollowing(prev) {
          return true
        },
      },
    })
    const { me } = userData
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1
        },
      },
    })
  }

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username: user?.username },
    onCompleted: followUserCompleted,
  })

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
            src={verifiedIcon}
            alt="official"
            style={{
              width: "25px",
            }}
          ></img>
        ) : null}
        <PostHeaderRight>
          {!followed && <Subscribe onClick={followUser}>Подписаться</Subscribe>}
          <More onClick={() => setActiveModal(true)}>
            <img
              className="cursor-pointer"
              style={{ width: "12px", rotate: "90deg" }}
              src={more}
              alt="more"
            />
          </More>
          {activeModal && (
            <ModalContent
              id={id}
              isMine={isMine}
              closeModal={() => setActiveModal(false)}
              openReportPopup={() => setReportPopupShowed(true)}
            />
          )}
        </PostHeaderRight>
      </PostHeader>
      <PostContent src={file} />
      <PostFooter>
        <PostActions>
          <PostAction
            onClick={addDislike}
            style={{ display: isLiked ? "none" : "block" }}
          >
            <IconAction>
              <div>
                {" "}
                <img
                  src={!isDisliked ? dislikeIcon : dislikeIconFill}
                  alt=""
                />{" "}
              </div>
            </IconAction>

            {/* <FontAwesomeIcon
              style={{
                fontSize: "32px",
                transition: "0.5s ease",
                opacity: isDisliked ? 1 : 0.3,
              }}
              icon={isDisliked ? faHeartBroken : faHeartBroken}
            /> */}
          </PostAction>
          <PostAction
            onClick={addLike}
            style={{ display: isDisliked ? "none" : "block" }}
          >
            <IconAction>
              <div>
                {" "}
                <img src={!isLiked ? likeIcon : likeIconFill} alt="" />{" "}
              </div>
            </IconAction>
            {/* <FontAwesomeIcon
              style={{
                fontSize: "32px",
                transition: "0.5s ease",
                color: isLiked ? "#F0355B" : "inherit",
              }}
              // icon={isLiked ? SolidHeart : faHeart} old
              icon={isLiked ? heartLike : heartLike}
            /> */}
          </PostAction>
        </PostActions>
      </PostFooter>
      {/* <Modal active={activeModal} setActive={setActiveModal}>
        <ModalContent id={id} isMine={isMine} />
      </Modal> */}
      {reportPopup && (
        <ReportPopup
          photoId={id}
          setResMes={() => setModalAlert(true)}
          close={() => setReportPopupShowed(false)}
        />
      )}

      {modalAlert && <ModalAlert text={"Жалоба успешно отправлена"} />}
    </PostContainer>
  )
}

const PostActions = styled.div`
  top: 0;
  left: 0;
  right: 0;
  gap: 60px;
  display: flex;
  margin-top: -30px;
  position: absolute;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
  }
`

export const PostAction = styled.div`
  cursor: pointer;
  background: #fff;
  padding: 13px 13px;
  border-radius: 100%;
  box-shadow: 0px 3px 8px 0px #0000001f;
`

const IconAction = styled.div`
  width: 32px;
  height: 32px;
  svg {
    width: 100%;
    height: auto;
  }
  justify-content: center;
  @media (max-width: 768px) {
    width: 28px;
    height: auto;
  }
`
