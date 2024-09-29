import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { client } from "../apollo"
import defaultAvatar from "../assets/img/DefaultAvatar.png"

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

export const TimeAgo = ({ timestamp }) => {
  timestamp = new Date(timestamp)
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - timestamp

  let timeAgo
  if (timeDifference < 60000) {
    timeAgo = "меньше минуты назад"
  } else if (timeDifference < 3600000) {
    const minutes = Math.floor(timeDifference / 60000)
    timeAgo = `${minutes} мин. назад`
  } else if (timeDifference < 86400000) {
    const hours = Math.floor(timeDifference / 3600000)
    timeAgo = `${hours} ч. назад`
  } else {
    const days = Math.floor(timeDifference / 86400000)
    timeAgo = `${days} д. назад`
  }

  return (
    <span style={{ fontSize: "11px" }}>
      <br />
      {timeAgo}
    </span>
  )
}

const Notifications = () => {
  const history = useHistory()
  const [viewedList, setViewedList] = useState([])
  const [newList, setNewList] = useState([])
  const [loading, setLoading] = useState(true) //loading

  const { cache } = client

  useEffect(() => {
    return () => cache.reset()
    // eslint-disable-next-line
  }, [])

  const { subscribeToMore, data } = useQuery(SEE_NOTIFIC, {
    onError: () => setLoading(false),
    onCompleted: () => {
      setLoading(false)
      const viewedArr = []
      const newArr = []
      if (data?.seeNotifications?.likes) {
        for (let i = 0; i < data.seeNotifications.likes.length; i++) {
          if (data.seeNotifications.likes[i].read) {
            viewedArr.push(data.seeNotifications.likes[i])
          } else {
            newArr.push(data.seeNotifications.likes[i])
          }
        }
      }
      if (data?.seeNotifications?.comments) {
        for (let i = 0; i < data.seeNotifications.comments.length; i++) {
          if (data.seeNotifications.comments[i].read) {
            viewedArr.push(data.seeNotifications.comments[i])
          } else {
            newArr.push(data.seeNotifications.comments[i])
          }
        }
      }
      if (data?.seeNotifications?.subs) {
        for (let i = 0; i < data.seeNotifications.subs.length; i++) {
          if (data.seeNotifications.subs[i].read) {
            viewedArr.push(data.seeNotifications.subs[i])
          } else {
            newArr.push(data.seeNotifications.subs[i])
          }
        }
      }
      setViewedList([
        ...viewedArr.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      ])
      setNewList([
        ...newArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ])
    },
  })

  useEffect(() => {
    const subscribe = subscribeToMore({
      document: SUB_NOTIFIC_UPDATES,
      updateQuery: (prev, { subscriptionData }) => {
        // seeNotifications
        cache.reset()
        if (subscriptionData?.data?.notificationsUpdates?.like) {
          setNewList((prev) => [
            subscriptionData.data.notificationsUpdates.like,
            ...prev,
          ])
        }
        if (subscriptionData?.data?.notificationsUpdates?.comment) {
          setNewList((prev) => [
            subscriptionData.data.notificationsUpdates.comment,
            ...prev,
          ])
        }
        if (subscriptionData?.data?.notificationsUpdates?.sub) {
          setNewList((prev) => [
            subscriptionData.data.notificationsUpdates.sub,
            ...prev,
          ])
        }
      },
    })
    return () => subscribe()
    // eslint-disable-next-line
  }, [subscribeToMore])

  function whatIsNotif(item) {
    if (item.payload) {
      return `прокомментировал(а): ${item.payload}`
    }
    if (item.username) {
      return `на вас подписался(лась)`
    }
    return "понравилась ваша публикация"
  }

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
            {newList.length > 0
              ? `Новые: ${newList.length}`
              : "Новых уведомлений нет"}
          </p>
          {newList.length > 0 &&
            newList.map((item, index) => (
              <>
                {item.username ? (
                  <StyledItem key={index}>
                    <Link to={`/${item.username}`}>
                      <Avatar src={item?.avatar || defaultAvatar} />
                    </Link>
                    <div className="textWrap">
                      <Link to={`/${item.username}`}>
                        <p>{item.username}</p>
                      </Link>
                      <span>{whatIsNotif(item)}</span>
                      <TimeAgo timestamp={item.createdAt} />
                    </div>
                  </StyledItem>
                ) : (
                  <StyledItem key={index}>
                    <Link to={`/${item.user.username}`}>
                      <Avatar src={item.user?.avatar || defaultAvatar} />
                    </Link>
                    <div className="textWrap">
                      <Link to={`/${item.user.username}`}>
                        <p>{item.user.username}</p>
                      </Link>
                      <span>{whatIsNotif(item)}</span>
                      <TimeAgo timestamp={item.createdAt} />
                    </div>
                    <StyledPhoto>
                      <img src={item.photo.file} alt="" />
                    </StyledPhoto>
                  </StyledItem>
                )}{" "}
              </>
            ))}
          <p className="title">
            {viewedList.length > 0
              ? `Просмотренные: ${viewedList.length}`
              : "Просмотренных уведомлений нет"}
          </p>
          {viewedList.length > 0 &&
            viewedList.map((item, index) => (
              <>
                {item.username ? (
                  <StyledItem key={index}>
                    <Link to={`/${item.username}`}>
                      <Avatar src={item?.avatar || defaultAvatar} />
                    </Link>
                    <div className="textWrap">
                      <Link to={`/${item.username}`}>
                        <p>{item.username}</p>
                      </Link>
                      <span>{whatIsNotif(item)}</span>
                      <TimeAgo timestamp={item.createdAt} />
                    </div>
                  </StyledItem>
                ) : (
                  <StyledItem key={index}>
                    <Link to={`/${item.user.username}`}>
                      <Avatar src={item.user?.avatar || defaultAvatar} />
                    </Link>
                    <div className="textWrap">
                      <Link to={`/${item.user.username}`}>
                        <p>{item.user.username}</p>
                      </Link>
                      <span>{whatIsNotif(item)}</span>
                      <TimeAgo timestamp={item.createdAt} />
                    </div>
                    <StyledPhoto>
                      <img src={item.photo.file} alt="" />
                    </StyledPhoto>
                  </StyledItem>
                )}{" "}
              </>
            ))}
        </div>
      </StyledList>

      {/* <Hr></Hr> */}
    </NotificationsWrap>
  )
}

export  const StyledList = styled.div`
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

export const StyledPhoto = styled.div`
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
  border: 1px solid #0000001a;
  overflow: hidden;
  flex-direction: column;
  height: calc(100dvh - 60px);
  @media (min-width: 768px) {
    width: 1000px;
    height: 80vh;
    max-width: 100%;
    margin-top: 38px;
    background: #fff;
  }
`

export  const StyledHeader = styled.div`
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

export const Avatar = styled.img`
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
