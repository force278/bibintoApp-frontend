import PropTypes from "prop-types"
import styled from "styled-components"
import Comment from "./Comment"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import useMe from "../../hooks/useMe"

const CommentsContainer = styled.div`
  margin-top: 20px;
`

const CommentsNumber = styled.span`
  opacity: 0.7;
  margin: 10px 0;
  display: block;
  font-size: 12px;
  font-weight: 600;
`

const PostCommentContainer = styled.div`
  display: flex;
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`

function Comments({ photoId, author, caption, commentsNumber, comments }) {
  const { data: userData } = useMe()
  const { register, handleSubmit, setValue, getValues } = useForm()

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
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentsNumber>
        {commentsNumber === 1
          ? "1 комментарий"
          : `${commentsNumber} комментариев`}
      </CommentsNumber>
      {comments?.map((comment) => (
        <Comment
          id={comment.id}
          isMine={comment.isMine}
          photoId={photoId}
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
          official={comment.user.official}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)} className="d-flex w-100">
          <div className="d-flex justify-content-between w-100">
            <PostCommentInput
              {...register("payload", { required: true })}
              type="text"
              placeholder="Добавьте комментарий..."
            />
            <button
              type="submit"
              className="bg-transparent border-0"
              style={{ color: "#2283F5", fontWeight: "600" }}
            >
              Опубликовать
            </button>
          </div>
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  )
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
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

export default Comments
