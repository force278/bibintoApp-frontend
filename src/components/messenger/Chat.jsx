import styled from "styled-components"
import { Avatar } from "@mui/material"
import { useForm } from "react-hook-form"
import IconSend from "../../assets/img/IconSend.svg"
import { gql, useMutation, useQuery } from "@apollo/client"
import IconStartChat from "../../assets/img/messenger/IconStartChat.svg"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"
import { useRef } from "react"

const READ_MESSAGE = gql`
  mutation readDialog($id: Int!) {
    readDialog(id: $id) {
      ok
      error
    }
  }
`

const SEND_MESSAGE = gql`
  mutation sendMessage($payload: String!, $userId: Int!) {
    sendMessage(payload: $payload, userId: $userId) {
      error
      id
      ok
    }
  }
`

const SEE_USER = gql`
  query SeeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      avatar
      username
    }
  }
`

const ChatMob = ({ username, messages, dialogId }) => {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, setValue } = useForm()
  const bottomRef = useRef()

  const seeUser = useQuery(SEE_USER, {
    variables: { username },
    onCompleted: (data) => {
      setUser(data.seeProfile)
    },
  })

  useEffect(() => {
    setLoading(true)
    setUser({})
  }, [username])

  useEffect(() => {
    if (bottomRef?.current) {
      if (!loading) {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
        })
      } else {
        bottomRef.current.scrollIntoView()
        setLoading(false)
      }
    }
  }, [messages])

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => {
      alert("Невозможно отправить сообщение")
    },
    onCompleted: (data) => {
      if (data?.sendMessage?.ok) {
        setValue("message", "")
      } else {
        alert(data?.sendMessage?.error)
      }
    },
  })

  const [readMessage] = useMutation(READ_MESSAGE)

  useEffect(() => {
    if (dialogId) {
      readMessage({ variables: { id: dialogId } })
    }
  }, [dialogId])

  const onValid = (data) => {
    if (data.message && user.id) {
      sendMessage({ variables: { payload: data.message, userId: user.id } })
    }
  }

  const handleBack = () => {
    history.goBack()
  }

  return (
    <ChatWrap
      style={{
        opacity: username ? 1 : 0,
        pointerEvents: username ? "all" : "none",
      }}
    >
      <div className="header">
        <button
          type="button"
          onClick={handleBack}
          className="formBtnBack"
        ></button>
        <Link to={`/${username}`}>
          <p className="username">{username}</p>
        </Link>
        <Link style={{ justifySelf: "flex-end" }} to={`/${username}`}>
          <Avatar src={user.avatar} />
        </Link>
      </div>
      <Messages>
        {messages.length > 0 ? (
          <MessagesListWrap>
            {messages.map((mes, index) => (
              <div
                key={index}
                className={"messageWrap " + (mes.user.isMe ? "me" : "")}
              >
                <p className="message">{mes.payload}</p>
              </div>
            ))}
            <p ref={bottomRef}></p>
          </MessagesListWrap>
        ) : (
          <StartChatWrap>
            <img src={IconStartChat} alt="" />
            <p>
              Для начала общения с {username}, вы должны быть подписаны друг на
              друга
            </p>
          </StartChatWrap>
        )}
      </Messages>
      <FormContainer>
        <form onSubmit={handleSubmit(onValid)} className="d-flex w-100">
          <div className="formWrap">
            <FormInput
              type="text"
              placeholder="Введите сообщение"
              {...register("message", { required: true })}
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
      </FormContainer>
    </ChatWrap>
  )
}

export default ChatMob

const StartChatWrap = styled.div`
  flex: 1;
  gap: 20px;
  height: 100%;
  display: flex;
  color: #76768c;
  padding: 0 20px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const Messages = styled.div`
  flex: 1;
  overflow: auto;
`

const MessagesListWrap = styled.div`
  gap: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .messageWrap {
    display: flex;
  }
  .message {
    color: #1f1f2c;
    font-size: 15px;
    padding: 6px 12px;
    background: #f2f2f7;
    border-radius: 4px 18px 18px 16px;
  }
  .me {
    justify-content: flex-end;
    .message {
      color: #fff;
      background: #1877f2;
      border-radius: 18px 18px 4px 16px;
    }
  }
`

const FormContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 60px;
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
  @media (min-width: 768px) {
    position: static;
  }
`
export const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 133px);
  .formBtnBack {
    position: static;
  }
  .username {
    text-align: center;
  }
  .header {
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  @media (min-width: 768px) {
    flex: 1;
    height: 100%;
    .formBtnBack {
      visibility: hidden;
    }
    .header {
      font-size: 17px;
      font-weight: 500;
      padding: 6px 16px;
      align-items: center;
    }
  }
`

export const FormInput = styled.input`
  width: 100%;
  border: none;
  &::placeholder {
    font-size: 14px;
    color: #76768c;
  }
  &:focus {
    outline: none;
  }
`
