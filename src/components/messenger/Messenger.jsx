import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min"
import "./messenger.scss"
import mesViewed from "../../assets/img/messenger/mesViewed.svg"
import mesNotViewed from "../../assets/img/messenger/mesNotViewed.svg"
import { Avatar } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import Chat from "./Chat"
import MessengerMob from "./MessengerMob"
import { client } from "../../apollo"
import { isMob } from "../../utils/isMob"

const SUB_DIALOGS_UPDATES = gql`
  subscription AllDialogsUpdates {
    allDialogsUpdates {
      dialogId
      newMessage {
        dialogId
        createdAt
        id
        payload
        read
        user {
          avatar
          username
          isMe
        }
      }
      read
    }
  }
`

const GET_DIALOGS = gql`
  query seeDialogs {
    seeDialogs {
      id
      messages {
        id
        createdAt
        payload
        read
        user {
          username
          isMe
        }
      }
      unreadTotal
      users {
        username
        avatar
        isMe
      }
    }
  }
`

const Messenger = () => {
  const { cache } = client
  const history = useHistory()
  const curPath = useLocation()
  const [user, setUser] = useState()
  const [dialogId, setDialogId] = useState()
  const [isMobile] = useState(isMob())
  const [curChatMes, setCurChatMes] = useState([])
  const [dialoguesList, setDialoguesList] = useState([])

  // Меняем URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const userParam = searchParams.get("user")
    userParam ? setUser(userParam) : setUser()
  }, [curPath])

  //
  useEffect(() => {
    // Если выбрали диалог с челом и если у нас вообще есть диалоги
    if (user && dialoguesList.length) {
      // пытаемся найти текущий диалог с тем челом, которого выбрали среди нашего списка диалогов
      try {
        const curChat = dialoguesList.find(
          (dialogue) =>
            dialogue.users.findIndex(({ username }) => username === user) >= 0,
        )
        // Устанавливаем сообщения сортируя по айдишнику
        setCurChatMes([...curChat.messages].sort((a, b) => +a.id - +b.id))
        // Устанавливаем текущий id диалога
        setDialogId(curChat.id)
      } catch (e) {
        setCurChatMes([])
      }
    } else {
      setCurChatMes([])
    }
  }, [user, dialoguesList]) // если меняется выбранный пользователь или список диалогов - пересчитываем

  const { subscribeToMore, data: dialogues } = useQuery(GET_DIALOGS)

  useEffect(() => {
    if (dialogues?.seeDialogs) {
      setDialoguesList(
        dialogues.seeDialogs.filter((dialog) => dialog.messages.length > 0),
      )
    }
  }, [dialogues])

  useEffect(() => {
    const subscribe = subscribeToMore({
      document: SUB_DIALOGS_UPDATES,
      onError: () => {
        setTimeout(() => {
          setDialoguesList((prev) => [...prev])
        }, 500)
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data?.allDialogsUpdates) return
        const editedDialogueIndex = dialoguesList.findIndex(
          (dialogue) =>
            dialogue.id === subscriptionData?.data?.allDialogsUpdates?.dialogId,
        )
        if (editedDialogueIndex < 0) {
          return cache.reset()
        }
        if (subscriptionData.data.allDialogsUpdates.newMessage) {
          const newMessage = subscriptionData.data.allDialogsUpdates.newMessage
          const newMesList = [
            ...dialoguesList[editedDialogueIndex].messages,
            newMessage,
          ]
          setDialoguesList((prev) => [
            ...prev.slice(0, editedDialogueIndex),
            {
              ...dialoguesList[editedDialogueIndex],
              messages: newMesList,
            },
            ...prev.slice(editedDialogueIndex + 1),
          ])
        }
        if (subscriptionData.data.allDialogsUpdates.read) {
          const readedMesId = subscriptionData.data.allDialogsUpdates.read
          const newMesList = dialoguesList[editedDialogueIndex].messages.map(
            (mes) => (mes.id === readedMesId ? { ...mes, read: true } : mes),
          )
          setDialoguesList((prev) => [
            ...prev.slice(0, editedDialogueIndex),
            {
              ...dialoguesList[editedDialogueIndex],
              messages: newMesList,
            },
            ...prev.slice(editedDialogueIndex + 1),
          ])
        }
      },
    })
    return () => subscribe()
    // eslint-disable-next-line
  }, [subscribeToMore, dialoguesList])

  useEffect(() => {
    return () => cache.reset()
    // eslint-disable-next-line
  }, [])

  const mesSended = () => {
    if (curChatMes.length === 0) {
      return cache.reset()
    }
  }

  return (
    <>
      {!isMobile && (
        <MessengerWrap>
          <DialoguesWrap>
            <ul className="dialogues">
              {dialoguesList.length === 0 && !dialogues ? (
                <p
                  style={{ padding: "16px", color: "#76768c" }}
                  className="title"
                >
                  Загрузка...
                </p>
              ) : dialoguesList.length === 0 ? (
                <p
                  style={{ padding: "16px", color: "#76768c" }}
                  className="title"
                >
                  Нет диалогов
                </p>
              ) : (
                dialoguesList.map((dialogue, index) => {
                  const lastMes = [...dialogue.messages].sort(
                    (a, b) => b.id - a.id,
                  )[0]
                  const companion = dialogue.users.find((user) => !user.isMe)
                  const unreadTotal = dialogue.messages?.length
                    ? dialogue.messages.filter(
                        (mes) => !mes.user.isMe && !mes.read,
                      ).length
                    : 0
                  return (
                    <li className="dialogue" key={index}>
                      <Link to={`/${companion.username}`}>
                        <div className="avatarWrap">
                          <Avatar src={companion.avatar} />
                        </div>
                      </Link>
                      <Link
                        to={`/me?${"user=" + companion.username}`}
                        style={{ flex: 1 }}
                      >
                        <div className="info">
                          <p className="username">{companion.username}</p>
                          <p className="message">{lastMes.payload}</p>
                        </div>
                      </Link>
                      <div className="statusWrap">
                        <div className="status">
                          {lastMes.user.isMe && lastMes.read && (
                            <img src={mesViewed} alt="" />
                          )}
                          {lastMes.user.isMe && !lastMes.read && (
                            <img src={mesNotViewed} alt="" />
                          )}
                          {!lastMes.user.isMe && unreadTotal ? (
                            <span className="statusUnread">{unreadTotal}</span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </DialoguesWrap>
          <Chat
            username={user}
            messages={curChatMes}
            mesSended={mesSended}
            dialogId={dialogId}
          />
        </MessengerWrap>
      )}
      {isMobile && (
        <MessengerMob
          user={user}
          cache={cache}
          history={history}
          curPath={curPath}
          setUser={setUser}
          curChatMes={curChatMes}
          setCurChatMes={setCurChatMes}
          dialoguesList={dialoguesList}
          setDialoguesList={setDialoguesList}
          dialogId={dialogId}
        />
      )}
    </>
  )
}

export default Messenger

export const DialoguesWrap = styled.div`
  width: 350px;
  @media (min-width: 768px) {
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }
`

export const MessengerWrap = styled.div`
  height: 80vh;
  overflow: hidden;
  margin-top: 38px;
  display: flex;
  width: 1000px;
  max-width: 100%;

  .username {
    text-align: center;
  }
  .header {
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
  }
  @media (min-width: 768px) {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 10px 0px;
  }
  @media (min-width: 768px) {
    background-color: #fff;
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
