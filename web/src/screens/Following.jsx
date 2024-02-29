import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min"
import { client } from "../apollo"

const SEE_FOLLOWING = gql`
  query seeFollowing($username: String!, $lastId: Int) {
    seeFollowing(username: $username, lastId: $lastId) {
      error
      following {
        id
        avatar
        username
      }
      ok
    }
  }
`

const Following = () => {
  const history = useHistory()
  const { username } = useParams()
  const [isEnd, setIsEnd] = useState(false)
  const [lastId, setLastId] = useState(0)
  const [allList, setAllList] = useState([])
  const [loading, setLoading] = useState(true) //loading
  const [totalPages, setTotalPages] = useState(1)

  const { cache } = client

  useEffect(() => {
    return () => cache.reset()
    // eslint-disable-next-line
  }, [])

  useQuery(SEE_FOLLOWING, {
    variables: { lastId, username },
    onError: (err) => {
      console.log(err)
      setLoading(false)
    },
    onCompleted: (data) => {
      setLoading(false)
      const following = data?.seeFollowing?.following
      if (!following) return
      setAllList((prev) => [...prev, ...following])
      if (following.length === 0) setIsEnd(true)
    },
  })

  useEffect(() => {
    const followingList = document.getElementById("following_list")
    const checking = (e) => {
      if (
        e.target.scrollTop + e.target.clientHeight ===
        e.target.scrollHeight
      ) {
        setLoading(true)
        if (allList.length && allList[allList.length - 1]) {
          setLastId(allList[allList.length - 1].id)
        }
      }
    }
    if (
      !isEnd &&
      allList.length > 0 &&
      followingList.getBoundingClientRect().height >
        followingList.firstElementChild.getBoundingClientRect().height
    ) {
      setLoading(true)
      setLastId(allList[allList.length - 1].id)
      return
    }
    if (!isEnd) {
      followingList.addEventListener("scroll", checking)
    }
    return () => {
      followingList.removeEventListener("scroll", checking)
    }
    // eslint-disable-next-line
  }, [allList, isEnd])

  return (
    <FollowersWrap>
      <StyledHeader>
        <button
          type="button"
          className="formBtnBack"
          onClick={() => history.goBack()}
        ></button>
        <p>Подписки</p>
      </StyledHeader>
      <StyledList id="following_list">
        <div>
          {allList.length > 0 &&
            allList.map((user, index) => (
              <StyledItem key={index}>
                <Link to={`/${user.username}`}>
                  <Avatar src={user?.avatar} />
                </Link>
                <div className="textWrap">
                  <p>{user.username}</p>
                </div>
              </StyledItem>
            ))}
        </div>
      </StyledList>
    </FollowersWrap>
  )
}

const StyledList = styled.div`
  flex: 1;
  padding: 16px;
  overflow: auto;
  border-top: 1px solid #f2f2f7;
  .title {
    font-size: 13px;
    font-weight: 500;
    color: #76768c;
  }
  @media (min-width: 768px) {
    border: none;
    padding: 38px;
    padding-top: 32px;
  }
`

const StyledItem = styled.div`
  gap: 8px;
  display: flex;
  padding-bottom: 16px;
  align-items: center;
  .textWrap {
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

const FollowersWrap = styled.div`
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

export default Following
