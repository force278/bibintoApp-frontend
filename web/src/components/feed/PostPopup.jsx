import { useEffect } from "react"
import useMe from "../../hooks/useMe"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import more from "../../assets/img/post/more.svg"
import IconSend from "../../assets/img/IconSend.svg"
import { gql, useMutation } from "@apollo/client"
import heartLike from "../../assets/img/like"
import heartLikeDark from "../../assets/img/likeIconDark"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { PostCommentInput } from "./Comments"
import { useState } from "react"
import { useRef } from "react"
import {
  IconAction,
  More,
  PostAction,
  PostContent,
  PostHeader,
  PostHeaderRight,
  Username,
} from "./Post"
import ModalContent from "../modal/ModalContent"

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`

const StyledList = styled.div`
  flex: 1;
  padding: 16px;
  overflow: auto;
  padding-bottom: 60px;
  .title {
    color: #76768c;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`

const StyledItem = styled.div`
  gap: 8px;
  display: flex;
  color: #1f1f2c;
  padding-bottom: 16px;
  align-items: flex-start;
  .textWrap {
    flex: 1;
  }
  p {
    font-size: 15px;
    font-weight: 500;
  }
  span {
    font-size: 13px;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 16px 16px 16px;
  p {
    font-size: 17px;
    font-weight: 500;
  }
  button {
    left: 16px;
    position: absolute;
  }
`

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #2c2c2c;
`
const PostWrap = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  display: flex;
  height: 100dvh;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  @media (max-width: 768px) {
    display: none;
    * {
      display: none;
    }
  }
`

const PostWindow = styled.div`
  width: 1000px;
  display: grid;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 20px;
  background-color: #fff;
  grid-template-columns: 0.6fr 0.4fr;
`

const RightContent = styled.div`
  display: flex;
  max-height: 80vh;
  overflow: hidden;
  flex-direction: column;
`

const PhotoWrap = styled.div``

const PostCommentContainer = styled.div`
  height: 73px;
  display: flex;
  padding-bottom: 10px;
  background-color: #fff;
  padding: 16px 16px 24px 16px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  .formWrap {
    gap: 8px;
    width: 100%;
    display: flex;
  }
  input {
    border-radius: 30px;
    background-color: #f2f2f7;
    padding: 7px 15px 8px 15px;
  }
  .btnSubmit {
    margin: 0;
    padding: 0;
    width: 32px;
    height: 32px;
    border: none;
    display: flex;
    flex-shrink: 0;
    min-width: 32px;
    align-items: center;
    border-radius: 100%;
    background: #1877f2;
    justify-content: center;
    img {
      width: 16px;
      height: 16px;
    }
  }
`

const PostPopup = ({
  user,
  id,
  likes,
  file,
  close,
  isMine,
  isLiked,
  photoId,
  comments,
  toogleLike,
  modalActive,
  defaultAvatar,
  setModalActive,
}) => {
  const modalRef = useRef()
  const windowRef = useRef()
  // const history = useHistory()
  const { data: userData } = useMe()
  const [showModal, setShowModal] = useState()
  const { register, handleSubmit, setValue, getValues } = useForm()

  useEffect(() => {
    const body = document.querySelector("body")
    if (!body) return
    body.style.height = "100dvh"
    body.style.overflow = "hidden"
    return () => {
      body.style.height = "auto"
      body.style.overflow = "auto"
    }
  }, [])

  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues()
    setValue("payload", "")
    const {
      data: {
        createComment: { ok, id },
      },
    } = result
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        id,
        createdAt: Date.now() + "",
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      }
      const newCachedComment = cache.writeFragment({
        fragment: gql`
          fragment newComment on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
            }
          }
        `,
        data: newComment,
      })
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCachedComment]
          },
          commentsNumber(prev) {
            return prev + 1
          },
        },
      })
    }
  }

  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate,
  })
  const onValid = (data) => {
    const { payload } = data
    if (loading) return
    createComment({
      variables: {
        photoId,
        payload,
      },
    })
  }

  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result
    if (ok) {
      cache.evict(`Comment:${photoId}`)
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentsNumber(prev) {
            return prev - 1
          },
        },
      })
    }
  }

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id: photoId,
    },
    update: updateDeleteComment,
  })

  // show
  const handleShowModal = (e, id) => {
    e.stopPropagation()
    showModal === id ? setShowModal() : setShowModal(id)
  }
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal()
      }
    }
    document.addEventListener("click", handleClickOutsideModal)
    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        close()
      }
    }
    document.addEventListener("click", handleClickOutsideModal)
    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
    // eslint-disable-next-line
  }, [])

  const onDeleteClick = (id) => {
    deleteComment({ variables: { id } })
  }

  return (
    <PostWrap>
      <PostWindow ref={windowRef}>
        {/* <PhotoWrap> */}
        <PostContent src={file} />
        {/* </PhotoWrap> */}
        <RightContent>
          <PostHeader>
            <Link to={`/${user?.username}`}>
              {user?.avatar ? (
                <Avatar src={user?.avatar} lg={true} />
              ) : (
                <Avatar src={defaultAvatar} lg={true} />
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
                />
              )}
            </PostHeaderRight>
          </PostHeader>

          <PostAction onClick={toogleLike}>
            <IconAction>{isLiked ? heartLikeDark : heartLike}</IconAction>
            {likes > 0 && (
              <p className={isLiked ? "likeNumb fill" : "likeNumb"}>{likes}</p>
            )}
            {/* <FontAwesomeIcon
              style={{ color: isLiked ? "#F0355B" : "inherit" }}
              icon={isLiked ? SolidHeart : faHeart}
            />
            {likes > 0 && <p>{likes}</p>} */}
          </PostAction>

          <StyledList>
            {comments.length === 0 ? (
              <p className="title">Комментариев пока нет</p>
            ) : (
              <p className="title">Комментарии:</p>
            )}
            {comments.length > 0 &&
              comments.map((item, index) => (
                <StyledItem key={index}>
                  <Link to={`/${item.user.username}`}>
                    <p>{item.user.username}</p>
                  </Link>
                  <div className="textWrap">
                    <span>{item.payload}</span>
                  </div>
                  <div>
                    {item.isMine && (
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => handleShowModal(e, item.id)}
                      >
                        <img
                          className="cursor-pointer"
                          style={{ width: "12px" }}
                          src={more}
                          alt="Удалить"
                        />
                      </button>
                    )}
                    {showModal === item.id && (
                      <div className="modalContentWrap" ref={modalRef}>
                        <div
                          className="Delete"
                          onClick={() => onDeleteClick(item.id)}
                        >
                          Удалить
                        </div>
                      </div>
                    )}
                  </div>
                </StyledItem>
              ))}
          </StyledList>
          <PostCommentContainer>
            <form onSubmit={handleSubmit(onValid)} className="d-flex w-100">
              <div className="formWrap">
                <PostCommentInput
                  {...register("payload", { required: true })}
                  type="text"
                  placeholder="Напишите комментарий"
                />
                <button
                  type="submit"
                  className="btnSubmit"
                  style={{ color: "#1F1F2C", fontWeight: "600" }}
                >
                  <img src={IconSend} alt="send" />
                </button>
              </div>
            </form>
          </PostCommentContainer>
        </RightContent>
      </PostWindow>
    </PostWrap>
  )
}

export default PostPopup
