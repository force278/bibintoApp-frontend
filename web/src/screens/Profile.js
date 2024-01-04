import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { BoldText } from "../components/shared"
import { POST_FRAGMENT } from "../fragments"
import Button, { DefaultButton } from "../components/auth/Button"
import PageTitle from "../components/PageTitle"
import useMe from "../hooks/useMe"
import defaultAvatar from "../assets/img/editProfile/defaultAvatar.png"
import { ModalMUI } from "../components/MUI/Modal"

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      official
      totalFollowers
      totalFollowing
      photos {
        ...PostFragment
      }
      isMe
      isFollowing
    }
  }
  ${POST_FRAGMENT}
`

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`

const UNFOLLOW_USER_MUTATION = gql`
  mutation unFollowUser($username: String!) {
    unFollowUser(username: $username) {
      ok
    }
  }
`

const StyledProfileContainer = styled.div`
  margin-top: 65px;
`

const Header = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
  object-fit: cover;
  @media (max-width: 768px) {
    margin: 0;
  }
`
const Column = styled.div`
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
`
const List = styled.ul`
  display: flex;
`
const Item = styled.li`
  margin-right: 20px;
`
const Value = styled(BoldText)`
  font-size: 18px;
`
const Name = styled(BoldText)`
  font-size: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
  @media (max-width: 768px) {
    grid-auto-rows: 150px;
    margin: 30px;
    gap: 7px;
  }
`

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`

export const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  padding: 8px 10px;
  cursor: pointer;
`

const DefaultBtn = styled(DefaultButton).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  padding: 8px 10px;
  cursor: pointer;
`

function Profile() {
  const { username } = useParams()
  const { data: userData } = useMe()
  const client = useApolloClient()
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  })

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unFollowUser: { ok },
      },
    } = result
    if (!ok) return
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev - 1
        },
        isFollowing(prev) {
          return false
        },
      },
    })
    const { me } = userData
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1
        },
      },
    })
  }

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: unfollowUserUpdate,
  })

  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data
    const { cache } = client
    if (!ok) return
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev + 1
        },
        isFollowing(prev) {
          return true
        },
      },
    })
    const { me } = userData
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1
        },
      },
    })
  }

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    onCompleted: followUserCompleted,
  })

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile
    if (isMe)
      return (
        <DefaultBtn>
          <Link to="/accountEditProfile">Редактировать профиль</Link>
        </DefaultBtn>
      )
    if (isFollowing)
      return <DefaultBtn onClick={unfollowUser}>Отписаться</DefaultBtn>
    else return <ProfileBtn onClick={followUser}>Подписаться</ProfileBtn>
  }

  return (
    <StyledProfileContainer>
      <PageTitle
        title={
          loading ? "Загрузка..." : `Профиль ${data?.seeProfile?.username}`
        }
      />
      <Header>
        {data?.seeProfile?.avatar ? (
          <Avatar src={data?.seeProfile?.avatar} />
        ) : (
          <Avatar src={defaultAvatar} alt="default avatar" />
        )}
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile?.official ? (
              <img
                src="official.png"
                alt="official"
                style={{
                  width: "30px",
                }}
              ></img>
            ) : null}
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> подписчиков
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> подписок
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos
          .slice()
          .reverse()
          .map((photo) => (
            <Photo key={photo.id} bg={photo.file}>
              <Icons>
                <ModalMUI
                  liked={photo.likes}
                  selectedPhoto={photo.id}
                  photo={photo.file}
                  style={{ cursor: "pointer" }}
                />
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {photo.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {photo.commentsNumber}
                </Icon>
              </Icons>
            </Photo>
          ))}
      </Grid>
    </StyledProfileContainer>
  )
}

export default Profile
