import { useEffect } from "react"
import useMe from "../../hooks/useMe"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import more from "../../assets/img/post/more.svg"
import IconSend from "../../assets/img/IconSend.svg"
import { gql, useMutation } from "@apollo/client"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { PostCommentInput } from "./Comments"
import { useState } from "react"
import { useRef } from "react"

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
  margin-bottom: 73px;
  padding-bottom: 20px;
  border-top: 1px solid #f2f2f7;
  .title {
    font-size: 13px;
    font-weight: 500;
    color: #76768c;
  }
`

const StyledItem = styled.div`
  gap: 8px;
  display: flex;
  color: #1f1f2c;
  align-items: center;
  padding-bottom: 16px;
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
  width: 32px;
  height: 32px;
  margin-right: 0;
  margin-left: 50px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #2c2c2c;
  @media (max-width: 768px) {
    margin: 0;
  }
`
const CommentsWrap = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  display: flex;
  height: 100dvh;
  position: fixed;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-between;
  @media (min-width: 768px) {
    display: none;
  }
`

const PostCommentContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  height: 73px;
  display: flex;
  position: fixed;
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

const CommentsPopupMob = ({ close, photoId, comments }) => {
  const modalRef = useRef()
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
    // variables: {
    //   id: commentId,
    // },
    update: updateDeleteComment,
  })

  const onDeleteClick = (id) => {
    deleteComment({ variables: { id } })
  }

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

  return (
    <CommentsWrap>
      <div className="header">
        <button type="button" className="formBtnBack" onClick={close}></button>
        <p>Комментарии {comments.length > 0 ? `(${comments.length})` : ""}</p>
      </div>

      {/* <StyledHeader>
        <button type="button" className="formBtnBack" onClick={close}></button>
        <p>Комментарии {comments.length > 0 ? `(${comments.length})` : ""}</p>
      </StyledHeader> */}
      <StyledList>
        {comments.length === 0 && (
          <p className="title">Комментариев пока нет</p>
        )}
        {comments.length > 0 &&
          comments.map((item, index) => (
            <StyledItem key={index}>
              <Link to={`/${item.user.username}`}>
                <Avatar src={item.user?.avatar} />
              </Link>
              <div className="textWrap">
                <p>{item.user.username}</p>
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
                  <div className="CommentDelete" ref={modalRef}>
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
    </CommentsWrap>
  )
}

export default CommentsPopupMob
