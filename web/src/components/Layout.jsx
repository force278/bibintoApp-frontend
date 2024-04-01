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
  query seeNotifications($page: Int!) {
    seeNotifications(page: $page) {
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
      }
      totalPages
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
    }
  }
`

function Layout({ children }) {
  const { cache } = client
  const [page, setPage] = useState(1)
  const [notificationList, setNotificationList] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  console.log(cache)

  const { subscribeToMore, data } = useQuery(SEE_NOTIFIC, {
    variables: { page },
    onError: () => {
      setNotificationList([])
      setLoading(false)
      cache.reset()
    },
    onCompleted: () => {
      const arr = []
      if (!totalPages) setTotalPages(data?.seeNotifications?.totalPages || 0)
      if (data?.seeNotifications?.likes) {
        arr.push(...data.seeNotifications.likes)
      }
      if (data?.seeNotifications?.comments) {
        arr.push(...data.seeNotifications.comments)
      }

      if (page === 1) {
        setNotificationList([...arr.sort((a, b) => b.createdAt - a.createdAt)])
      } else {
        setNotificationList((prev) => [
          ...prev,
          ...arr.sort((a, b) => b.createdAt - a.createdAt),
        ])
      }
      setLoading(false)
    },
  })

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
      },
    })
    return () => {
      subscribe()
    }
    // eslint-disable-next-line
  }, [subscribeToMore])

  useEffect(() => {
    const notificList = document.getElementById("notific_list")
    if (!notificList) return
    const checking = (e) => {
      if (
        !loading &&
        e.target.scrollTop + e.target.clientHeight + 100 > e.target.scrollHeight
      ) {
        setLoading(true)
        setPage((prev) => +prev + 1)
      }
    }

    if (
      !loading &&
      totalPages > 1 &&
      page < totalPages &&
      notificList.getBoundingClientRect().height >
        notificList.firstElementChild.getBoundingClientRect().height
    ) {
      setLoading(true)
      setPage((prev) => +prev + 1)
    }

    if (totalPages > 1 && page < totalPages) {
      notificList.addEventListener("scroll", checking)
    } else {
      notificList.removeEventListener("scroll", checking)
    }
    return () => {
      notificList.removeEventListener("scroll", checking)
    }
    // eslint-disable-next-line
  }, [totalPages, loading])

  return (
    <>
      <Header notificationList={notificationList} />
      <Content>{children}</Content>
    </>
  )
}

export default Layout
