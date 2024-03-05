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
  const [, setDialogId] = useState()
  const [isMobile] = useState(isMob())
  const [curChatMes, setCurChatMes] = useState([])
  const [dialoguesList, setDialoguesList] = useState([])

  // DIALOG_UPDATES
  // useEffect(() => {
  //   console.log(dialoguesList)
  // }, [dialoguesList])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const userParam = searchParams.get("user")
    userParam ? setUser(userParam) : setUser()
  }, [curPath])

  useEffect(() => {
    if (user && dialoguesList.length) {
      try {
        const curChat = dialoguesList.find(
          (dialogue) =>
            dialogue.users.findIndex(({ username }) => username === user) >= 0,
        )
        setCurChatMes([...curChat.messages].sort((a, b) => +a.id - +b.id))
        setDialogId(curChat.id)
      } catch (e) {
        setCurChatMes([])
      }
    } else {
      setCurChatMes([])
    }
  }, [user, dialoguesList])

  // const friends = useQuery(GET_FRIENDS)
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
        console.log(subscriptionData.data.allDialogsUpdates)
        const editedDialogueIndex = dialoguesList.findIndex(
          (dialogue) =>
            dialogue.id === subscriptionData?.data?.allDialogsUpdates?.dialogId,
        )
        console.log(editedDialogueIndex)
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
        <div className="onlyDesk">
          <MessengerWrap>
            <DialoguesWrap>
              <ul className="dialogues">
                {dialoguesList.length === 0 && (
                  <p
                    style={{ padding: "16px", color: "#76768c" }}
                    className="title"
                  >
                    Диалогов пока нет
                  </p>
                )}
                {dialoguesList.map((dialogue, index) => {
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
                })}
              </ul>
            </DialoguesWrap>
            <Chat username={user} messages={curChatMes} mesSended={mesSended} />
          </MessengerWrap>
        </div>
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
  border: 1px solid #0000001a;

  .username {
    text-align: center;
  }
  .header {
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
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
