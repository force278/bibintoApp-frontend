import { useEffect, useState } from "react"
import { Header } from "./Header"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import { client } from "../apollo"

const Content = styled.div`
  margin: 0 auto;
  padding-top: 71px;
  @media (max-width: 768px) {
    padding-top: 0;
  }
  max-width: 930px;
  width: 100%;
`

const SEE_NOTIFIC = gql`
  query seeNotifications {
    seeNotifications {
      likes {
        createdAt
        photo {
          file
        }
        id
        user {
          avatar
          username
        }
        read
      }
      comments {
        createdAt
        photo {
          file
        }
        user {
          avatar
          username
        }
        payload
        read
      }
      subs {
        username
        avatar
        createdAt
        read
      }
    }
  }
`

const SUB_NOTIFIC_UPDATES = gql`
  subscription notificationsUpdates {
    notificationsUpdates {
      comment {
        createdAt
        photo {
          file
        }
        user {
          avatar
          username
        }
        payload
      }
      like {
        createdAt
        photo {
          file
        }
        id
        user {
          avatar
          username
        }
      }
      sub {
        username
        avatar
      }
    }
  }
`

const SUB_DIALOGS_UPDATES = gql`
  subscription allDialogsUpdates {
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

function Layout({ children }) {
  const { cache } = client
  const [notificationList, setNotificationList] = useState([])
  const [allList, setAllList] = useState([])
  const [loading, setLoading] = useState(true)
  const [messUpdated, setMessUpdated] = useState(false)

  const { subscribeToMore, data } = useQuery(SEE_NOTIFIC, {
    onError: () => setLoading(false),
    onCompleted: () => {
      setLoading(false)
      const arr = []
      if (data?.seeNotifications?.likes) {
        arr.push(...data.seeNotifications.likes)
      }
      if (data?.seeNotifications?.comments) {
        arr.push(...data.seeNotifications.comments)
      }
      if (data?.seeNotifications?.subs) {
        arr.push(...data.seeNotifications.subs)
      }
      setAllList([...arr.sort((a, b) => a.createdAt - b.createdAt)])
    },
  })

  useEffect(() => {
    const subscribe = subscribeToMore({
      document: SUB_DIALOGS_UPDATES,
      onError: (error) => {
        console.error("Error subscribing to dialog updates:", error)
        setMessUpdated(false)
      },
      updateQuery: (prev, { subscriptionData }) => {
        // Проверьте, есть ли новые данные в subscriptionData
        if (subscriptionData.data) {
          if (
            subscriptionData.data.allDialogsUpdates.newMessage &&
            !subscriptionData.data.allDialogsUpdates.newMessage.user.isMe
          ) {
            setMessUpdated(true)
          }
          // Верните обновленные данные, если необходимо
          return {
            ...prev,
            // Обновите ваши данные здесь, если нужно
          }
        }
        return prev
      },
    })

    return () => subscribe() // Отписка от подписки
    // eslint-disable-next-line
  }, [subscribeToMore])

  useEffect(() => {
    const subscribe = subscribeToMore({
      document: SUB_NOTIFIC_UPDATES,
      onError: () => {
        cache.reset()
        setNotificationList([])
        setLoading(false)
      },
      updateQuery: (prev, { subscriptionData }) => {
        // seeNotifications
        // cache.reset()

        if (subscriptionData?.data?.notificationsUpdates?.like) {
          setNotificationList((prev) => [
            subscriptionData.data.notificationsUpdates.like,
            ...prev,
          ])
        }
        if (subscriptionData?.data?.notificationsUpdates?.comment) {
          setNotificationList((prev) => [
            subscriptionData.data.notificationsUpdates.comment,
            ...prev,
          ])
        }
        if (subscriptionData?.data?.notificationsUpdates?.sub) {
          setAllList((prev) => [
            subscriptionData.data.notificationsUpdates.sub,
            ...prev,
          ])
        }
      },
    })
    return () => {
      subscribe()
    }
    // eslint-disable-next-line
  }, [subscribeToMore])

  return (
    <>
      <Header
        notificationList={notificationList}
        messUpdated={messUpdated}
        setMessUpdated={setMessUpdated}
      />
      <Content>{children}</Content>
    </>
  )
}

export default Layout
