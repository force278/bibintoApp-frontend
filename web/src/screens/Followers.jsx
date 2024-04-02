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

const SEE_FOLLOWERS = gql`
  query seeFollowers($username: String!, $page: Int!) {
    seeFollowers(username: $username, page: $page) {
      followers {
        id
        avatar
        username
      }
      ok
      error
      totalPages
    }
  }
`

const Followers = () => {
  const history = useHistory()
  const { username } = useParams()
  const [page, setPage] = useState(1)
  const [allList, setAllList] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const { cache } = client

  useEffect(() => {
    return () => cache.reset()
    // eslint-disable-next-line
  }, [])

  useQuery(SEE_FOLLOWERS, {
    variables: { page, username },
    onError: (err) => {
      console.log(err)
      setLoading(false)
    },
    onCompleted: (data) => {
      setLoading(false)
      const followers = data?.seeFollowers?.followers
      if (!followers) return
      console.log(followers)
      setTotalPages(data.seeFollowers.totalPages)
      if (page === 1) {
        setAllList([...followers])
      } else {
        setAllList((prev) => [...prev, ...followers])
      }
    },
  })

  useEffect(() => {
    const followersList = document.getElementById("followers_list")
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
      followersList.getBoundingClientRect().height >
        followersList.firstElementChild.getBoundingClientRect().height
    ) {
      setLoading(true)
      setPage((prev) => +prev + 1)
    }

    if (totalPages > 1 && page < totalPages) {
      followersList.addEventListener("scroll", checking)
    } else {
      followersList.removeEventListener("scroll", checking)
    }
    return () => {
      followersList.removeEventListener("scroll", checking)
    }
    // eslint-disable-next-line
  }, [totalPages, loading])

  return (
    <FollowersWrap>
      <StyledHeader>
        <button
          type="button"
          className="formBtnBack"
          onClick={() => history.goBack()}
        ></button>
        <p>Подписчики</p>
      </StyledHeader>
      <StyledList id="followers_list">
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

      {/* <Hr></Hr> */}
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

export default Followers
