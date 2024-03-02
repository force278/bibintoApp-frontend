import PropTypes from "prop-types"
import styled from "styled-components"
import { BoldText } from "../shared"
import Avatar from "../Avatar"
import more from "../../assets/img/post/more.svg"
import defaultAvatar from "../../assets/img/DefaultAvatar.png"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"

import likeIcon from "../../assets/img/like"
import likeIconDark from "../../assets/img/likeIconDark"
import IconComment from "../../assets/img/IconComment"

// import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons"
import { gql, useMutation } from "@apollo/client"
import Comments from "./Comments"
import { Link } from "react-router-dom"
import React from "react"
// import Modal from "../modal/Modal"
import { useState } from "react"
import ModalContent from "../modal/ModalContent"
import CommentsPopup from "./CommentsPopupMob"
import CommentsPopupMob from "./CommentsPopupMob"
import PostPopup from "./PostPopup"
import { isMob } from "../../utils/isMob"
import ReportPopup from "./ReportPopup"

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!, $value: Int!) {
    toggleLike(id: $id, value: $value) {
      ok
      error
    }
  }
`

function Post({
  id,
  user,
  file,
  isLiked,
  isMine,
  likes,
  caption,
  commentsNumber,
  comments,
}) {
  const [isMobile] = useState(isMob())
  const [reportPopup, setReportPopupShowed] = useState(false)
  const [commentsPopupShowed, setCommentsPopupShowed] = useState(false)

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
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            }
            return prev + 1
          },
        },
      })
    }
  }
  const [toogleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id, value: 10 },
    update: updateToggleLike,
  })
  const [modalActive, setModalActive] = useState(false)

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
        <PostHeaderRight>
          {/* <Subscribe onClick={() => console.log("Отписаться")}>
            Отписаться
          </Subscribe> */}
          <More onClick={() => setModalActive(true)}>
            <img
              className="cursor-pointer"
              style={{ width: "12px", rotate: "90deg" }}
              src={more}
              alt="more-in-post"
            />
          </More>
          {modalActive && (
            <ModalContent
              id={id}
              isMine={isMine}
              closeModal={() => setModalActive(false)}
              openReportPopup={() => setReportPopupShowed(true)}
            />
          )}
        </PostHeaderRight>
      </PostHeader>
      <PostContent src={file} onClick={() => setCommentsPopupShowed(true)} />
      <PostFooter>
        <PostActions>
          <PostAction onClick={toogleLike}>
            <IconAction>{isLiked ? likeIconDark : likeIcon}</IconAction>
            {likes > 0 && (
              <p className={isLiked ? "likeNumb fill" : "likeNumb"}>{likes}</p>
            )}
            {/* <FontAwesomeIcon
              style={{ color: isLiked ? "#F0355B" : "inherit" }}
              icon={isLiked ? SolidHeart : faHeart}
            />
            {likes > 0 && <p>{likes}</p>} */}
          </PostAction>

          <PostAction onClick={() => setCommentsPopupShowed(true)}>
            <IconAction style={{ width: "20px" }}>{IconComment}</IconAction>

            {/* <FontAwesomeIcon icon={faComment} /> */}

            {commentsNumber > 0 && <p>{commentsNumber}</p>}
          </PostAction>
        </PostActions>
        {/* <Likes>
          {likes === 1 ? '1 отметка "Нравится"' : `${likes} отметок "Нравится"`}
        </Likes> */}
        <div
          style={{ cursor: "pointer" }}
          // onClick={() => setCommentsPopupShowed(true)}
        >
          <Comments
            photoId={id}
            caption={caption}
            comments={comments}
            author={user.username}
            commentsNumber={commentsNumber}
          />
        </div>
        {commentsPopupShowed && isMobile && (
          <CommentsPopupMob
            photoId={id}
            // caption={caption}
            comments={comments}
            // author={user.username}
            // commentsNumber={commentsNumber}
            close={() => setCommentsPopupShowed(false)}
          />
        )}
        {/* desktop */}
        {commentsPopupShowed && !isMobile && (
          <PostPopup
            id={id}
            user={user}
            file={file}
            likes={likes}
            photoId={id}
            isMine={isMine}
            isLiked={isLiked}
            caption={caption}
            comments={comments}
            author={user.username}
            toogleLike={toogleLike}
            modalActive={modalActive}
            defaultAvatar={defaultAvatar}
            setModalActive={setModalActive}
            commentsNumber={commentsNumber}
            close={() => setCommentsPopupShowed(false)}
          />
        )}

        {/* reportPopup */}
      </PostFooter>

      {reportPopup && (
        <ReportPopup photoId={id} close={() => setReportPopupShowed(false)} />
      )}
      {/* <Modal active={modalActive} setActive={setModalActive}>
        <ModalContent id={id} isMine={isMine} />
      </Modal> */}
    </PostContainer>
  )
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isMine: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentsNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string,
      }),
      createdAt: PropTypes.string,
      isMine: PropTypes.bool,
    }),
  ),
}

export const PostContainer = styled.div`
  max-width: 600px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: white;
`

export const PostHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
  @media (min-width: 768px) {
    border-bottom: none;
  }
`

export const Username = styled(BoldText)`
  margin-left: 15px;
`

export const PostContent = styled.img`
  max-width: 100%;
  min-width: 100%;
  cursor: pointer;
  @media (max-width: 768px) {
    // pointer-events: none;
  }
`

export const PostFooter = styled.div`
  padding: 0;
  min-height: 80px;
  position: relative;
  @media (max-width: 768px) {
    min-height: 40px;
  }
`

export const PostActions = styled.div`
  gap: 30px;
  width: 130px;
  display: flex;
  padding: 7px 11px;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`

export const IconAction = styled.div`
  width: 22px;
  height: 22px;
  svg {
    width: 100%;
    height: 100%;
  }
`

export const PostAction = styled.div`
  gap: 8px;
  padding: 5px;
  display: flex;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  align-items: center;
  .likeIcon path {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
  }
  .likeNumb.fill {
    color: #ff3b30;
  }
  @media (min-width: 768px) {
    padding: 0 15px;
  }
`

export const Likes = styled(BoldText)`
  display: block;
  margin-top: 15px;
`

export const Subscribe = styled.button`
  border: 0;
  padding: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-left: auto;
  border-radius: 6px;
  background: #f2f2f7;
`

export const PostHeaderRight = styled.div`
  margin-left: auto;
  display: flex;
`

export const More = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  margin-left: 4px;
`

export default Post
