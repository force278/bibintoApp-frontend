import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { client } from "../apollo"

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

const Notifications = () => {
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [allList, setAllList] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const { cache } = client

  useEffect(() => {
    cache.reset()
    return () => cache.reset()
    // eslint-disable-next-line
  }, [])

  const { subscribeToMore, data } = useQuery(SEE_NOTIFIC, {
    variables: { page },
    onError: () => {
      setAllList([])
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
        setAllList([...arr.sort((a, b) => b.createdAt - a.createdAt)])
      } else {
        setAllList((prev) => [
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
        setAllList([])
        setLoading(false)
      },
      updateQuery: (prev, { subscriptionData }) => {
        // seeNotifications
        // cache.reset()
        if (subscriptionData?.data?.notificationsUpdates?.like) {
          setAllList((prev) => [
            subscriptionData.data.notificationsUpdates.like,
            ...prev,
          ])
        }
        if (subscriptionData?.data?.notificationsUpdates?.comment) {
          setAllList((prev) => [
            subscriptionData.data.notificationsUpdates.comment,
            ...prev,
          ])
        }
      },
    })
    return () => subscribe()
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
    <NotificationsWrap>
      <StyledHeader>
        <button
          type="button"
          className="formBtnBack"
          onClick={() => history.goBack()}
        ></button>
        <p>Уведомления</p>
      </StyledHeader>
      <StyledList id="notific_list">
        <div>
          <p className="title">
            {allList.length > 0
              ? `Новые: ${allList.length}`
              : "Новых уведомлений нет"}
          </p>
          {allList.length > 0 &&
            allList.map((item, index) => (
              <StyledItem key={index}>
                <Link to={`/${item.user.username}`}>
                  <Avatar src={item.user?.avatar} />
                </Link>
                <div className="textWrap">
                  <p>{item.user.username}</p>
                  <span>
                    {item.payload
                      ? `прокомментировал(а): ${item.payload}`
                      : "понравилась ваша публикация"}{" "}
                  </span>
                </div>
                <StyledPhoto>
                  <img src={item.photo.file} alt="" />
                </StyledPhoto>
              </StyledItem>
            ))}
        </div>
      </StyledList>

      {/* <Hr></Hr> */}
    </NotificationsWrap>
  )
}

const StyledList = styled.div`
  flex: 1;
  padding: 16px;
  overflow: auto;
  border-top: 1px solid #f2f2f7;
  .title {
    color: #76768c;
    font-size: 13px;
    font-weight: 500;
    padding-bottom: 16px;
  }
  @media (min-width: 768px) {
    border: none;
    padding: 38px;
    padding-top: 32px;
  }
`

const StyledPhoto = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 6px;
  object-fit: cover;
  img {
    width: 100%;
  }
`

const StyledItem = styled.div`
  gap: 8px;
  display: flex;
  padding-bottom: 16px;
  align-items: flex-start;
  .textWrap {
    margin-top: 6px;
    flex: 1;
  }
  p {
    font-size: 15px;
    font-weight: 500;
  }
  span {
    font-size: 13px;
    color: #76768c;
  }
`

const NotificationsWrap = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  height: calc(100dvh - 60px);
  @media (min-width: 768px) {
    width: 1000px;
    height: 80vh;
    max-width: 100%;
    margin-top: 38px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 10px 0px;
  }
`

const StyledHeader = styled.div`
  height: 60px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  position: relative;
  p {
    font-size: 17px;
    font-weight: 500;
  }
  button {
    left: 16px;
    position: absolute;
  }

  @media (min-width: 768px) {
    padding: 0;
    margin: 32px 38px;
    button {
      left: 0;
    }
    height: 36px;
  }
`

const Avatar = styled.img`
  // margin-left: 50px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 0;
  object-fit: cover;
  background-color: #2c2c2c;
  margin: 0;
  // margin-left: 0;
`

export default Notifications
