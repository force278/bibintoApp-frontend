import PropTypes from "prop-types"
import styled from "styled-components"
import { BoldText } from "../shared"
import Avatar from "../Avatar"
import moreIcon from "../../assets/img/More.svg"
import defaultAvatar from "../../assets/img/DefaultAvatar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons"
import { gql, useMutation } from "@apollo/client"
import Comments from "./Comments"
import { Link } from "react-router-dom"
import React from "react"
import Modal from "../modal/Modal"
import { useState } from "react"
import ModalContent from "../modal/ModalContent"

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!, $value: Int!) {
    toggleLike(id: $id, value: $value) {
      ok
      error
    }
  }
`

export const PostContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 585px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
`

export const Username = styled(BoldText)`
  margin-left: 15px;
`

export const PostContent = styled.img`
  max-width: 100%;
  min-width: 100%;
`

export const PostFooter = styled.div`
  padding: 12px 15px;
`

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`

export const PostAction = styled.div`
  margin-right: 15px;
  cursor: pointer;
`

export const Likes = styled(BoldText)`
  display: block;
  margin-top: 15px;
`

export const More = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: auto;
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
			): (
				<Avatar url={defaultAvatar} lg={true} />
			)}
        </Link>
        <Link to={`/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
        <More onClick={() => setModalActive(true)}>
          <img src={moreIcon} alt="more" />
        </More>
      </PostHeader>
      <PostContent src={file} />
      <PostFooter>
        <PostActions>
          <div>
            <PostAction onClick={toogleLike}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "#F0355B" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PostAction>
            <PostAction>
              <FontAwesomeIcon icon={faComment} />
            </PostAction>
          </div>
        </PostActions>
        <Likes>
          {likes === 1 ? '1 отметка "Нравится"' : `${likes} отметок "Нравится"`}
        </Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          commentsNumber={commentsNumber}
          comments={comments}
        />
      </PostFooter>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalContent id={id} isMine={isMine} />
      </Modal>
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

export default Post
