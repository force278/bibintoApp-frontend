import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { client } from "../apollo"

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

const Notifications = () => {
  const history = useHistory()
  const [allList, setAllList] = useState([])
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
      document: SUB_NOTIFIC_UPDATES,
      updateQuery: (prev, { subscriptionData }) => {
        // seeNotifications
        cache.reset()
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
        if (subscriptionData?.data?.notificationsUpdates?.sub) {
          setAllList((prev) => [
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
            {allList.length > 0
              ? `Новые: ${allList.length}`
              : "Новых уведомлений нет"}
          </p>
          {allList.length > 0 &&
            allList.reverse().map((item, index) => (
              <>
                {item.username ? (
                  <StyledItem key={index}>
                    <Link to={`/${item.username}`}>
                      <Avatar src={item?.avatar} />
                    </Link>
                    <div className="textWrap">
                      <p>{item.username}</p>
                      <span>{whatIsNotif(item)}</span>
                    </div>
                  </StyledItem>
                ) : (
                  <StyledItem key={index}>
                    <Link to={`/${item.user.username}`}>
                      <Avatar src={item.user?.avatar} />
                    </Link>
                    <div className="textWrap">
                      <p>{item.user.username}</p>
                      <span>{whatIsNotif(item)}</span>
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
