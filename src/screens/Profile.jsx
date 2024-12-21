import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
// import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import defaultAvatar from "../assets/img/editProfile/defaultAvatar.png"
import Button, { DefaultButton } from "../components/auth/Button"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconSettingsMob from "../assets/img/IconSettingsMob"
import chatIconLight from "../assets/img/chatIconLight"
import IconSettings from "../assets/img/IconSettings"
import { Link, useParams } from "react-router-dom"
// import { ModalMUI } from "../components/MUI/Modal"
import { BoldText } from "../components/shared"
import PageTitle from "../components/PageTitle"
import IconMenu from "../assets/img/IconMenu"
import camera from "../assets/img/camera.fill.svg"
import { MY_POST_FRAGMENT } from "../fragments"
import styled from "styled-components"
import useMe from "../hooks/useMe"
import { useState } from "react"
import Post from "../components/feed/Post"
import { isMob } from "../utils/isMob"
import { useEffect } from "react"

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
        ...MyPostFragment
      }
      isMe
      isFollowing
    }
  }
  ${MY_POST_FRAGMENT}
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

function Profile() {
  const history = useHistory()
  const { username } = useParams()
  const client = useApolloClient()
  const { data: userData } = useMe()
  const [isMobile] = useState(isMob)
  const [popupPosts, setPopupPosts] = useState(false)
  const [loadingPopupPosts, setLoadingPopupPosts] = useState(false)
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  })

  // useEffect(() => {
  //   const body = document.querySelector("body")
  //   body.style.backgroundColor = "#fff"
  //   return () => {
  //     body.style.backgroundColor = "#fdfdff"
  //   }
  // }, [])

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

  useEffect(() => {
    if (data?.seeProfile?.photos?.length === 0 && popupPosts) {
      setPopupPosts(false)
    }
  }, [popupPosts, data])

  const getButton = (seeProfile, isMob) => {
    const { isMe, isFollowing } = seeProfile
    if (isMe)
      return (
        <Link to="/accountEditProfile">
          <BtnSettings>
            {isMob ? IconSettingsMob : IconSettings}
            <span className="text">
              {isMob ? "Редактировать профиль" : "Настройки профиля"}
            </span>
          </BtnSettings>
        </Link>
      )
    if (isFollowing)
      return (
        <MobBtns>
          <BtnSettings
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#confirmModal"
          >
            Отписаться
          </BtnSettings>
          <Link to={`/me?${"user=" + username}`}>
            <ChatBtn>{chatIconLight}</ChatBtn>
          </Link>
        </MobBtns>
      )
    else return <ProfileBtn onClick={followUser}>Подписаться</ProfileBtn>
  }

  useEffect(() => {
    const scrollToEl = (elem) => {
      elem?.getBoundingClientRect()
      elem?.scrollIntoView()
      if (elem?.getBoundingClientRect()?.top > 180) {
        setTimeout(() => {
          scrollToEl(elem)
        }, 500)
      } else {
        setLoadingPopupPosts(false)
      }
    }
    const getPost = (postId) => {
      const post = document.getElementById(postId)
      if (post) {
        scrollToEl(post)
      } else {
        setTimeout(() => {
          getPost(postId)
        }, 50)
      }
    }

    ;+popupPosts > 0 && getPost(`post_${popupPosts}`)
  }, [popupPosts])

  const addPhoto = () => {
    const btnAddPhoto = document.getElementById("imageInput")
    if (btnAddPhoto) {
      btnAddPhoto.click()
    }
  }

  return (
    <StyledProfileContainer>
      <PageTitle
        title={
          loading ? "Загрузка..." : `Профиль ${data?.seeProfile?.username}`
        }
      />
      {isMobile && (
        <MobHeader>
          {/* шапка */}
          <div className="header">
            <button
              type="button"
              className="formBtnBack"
              onClick={() =>
                !popupPosts ? history.goBack() : setPopupPosts(false)
              }
            ></button>
            {!popupPosts && (
              <>
                <Username>
                  {data?.seeProfile?.username || "Пользователь не найден"}
                </Username>
                {data?.seeProfile?.isMe && (
                  <Link
                    type="button"
                    className="btnMenu"
                    to="/accountSettingsProfile"
                  >
                    {IconMenu}
                  </Link>
                )}
                {data?.seeProfile?.official ? (
                  <img
                    src="official.png"
                    alt="official"
                    style={{
                      width: "30px",
                    }}
                  ></img>
                ) : null}
              </>
            )}
          </div>

          {/* аватар имя статистика */}
          {!popupPosts && (
            <>
              {data?.seeProfile?.avatar ? (
                <Avatar src={data?.seeProfile?.avatar} />
              ) : (
                <Avatar src={defaultAvatar} alt="default avatar" />
              )}

              <Name style={{ marginTop: "8px" }}>
                {data?.seeProfile?.firstName}
                {"  "}
                {data?.seeProfile?.lastName}
              </Name>

              <Column>
                <Row>
                  <List>
                    <Item>
                      <p>{data?.seeProfile?.photos?.length || 0}</p>
                      <span>Постов</span>
                    </Item>
                    <Link to={`/${data?.seeProfile?.username}/followers`}>
                      <Item>
                        <p>{data?.seeProfile?.totalFollowers || 0}</p>
                        <span>Подписчиков</span>
                      </Item>
                    </Link>
                    <Link to={`/${data?.seeProfile?.username}/following`}>
                      <Item>
                        <p>{data?.seeProfile?.totalFollowing || 0}</p>
                        <span>Подписок</span>
                      </Item>
                    </Link>
                  </List>
                </Row>
                <Row style={{ overflowY: "auto" }}>{data?.seeProfile?.bio}</Row>
                {data?.seeProfile ? getButton(data.seeProfile, true) : null}
              </Column>
            </>
          )}
        </MobHeader>
      )}
      {/*  */}

      {!isMobile && !popupPosts && (
        <Header>
          {!data?.seeProfile?.isMe ? (
            <button
              type="button"
              className="formBtnBack"
              onClick={() => history.goBack()}
            ></button>
          ) : (
            <button
              type="button"
              className="formBtnBack"
              style={{ opacity: "0" }}
            ></button>
          )}
          {data?.seeProfile?.avatar ? (
            <Avatar src={data?.seeProfile?.avatar} />
          ) : (
            <Avatar src={defaultAvatar} alt="default avatar" />
          )}

          <Column>
            <Row style={{ gap: "20px", alignItems: "baseline" }}>
              <Username>
                {data?.seeProfile?.username || "Пользователь не найден"}
              </Username>
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
                    <Value>{data?.seeProfile?.photos?.length || 0}</Value>{" "}
                    постов
                  </span>
                </Item>

                <Link to={`/${data?.seeProfile?.username}/followers`}>
                  <Item>
                    <span>
                      <Value>{data?.seeProfile?.totalFollowers || 0}</Value>{" "}
                      подписчиков
                    </span>
                  </Item>
                </Link>
                <Link to={`/${data?.seeProfile?.username}/following`}>
                  <Item>
                    <span>
                      <Value>{data?.seeProfile?.totalFollowing || 0}</Value>{" "}
                      подписок
                    </span>
                  </Item>
                </Link>
              </List>
            </Row>
            <Row>
              <Name>
                {data?.seeProfile?.firstName}
                {"  "}
                {data?.seeProfile?.lastName}
              </Name>
            </Row>
            <Row style={{ color: "#76768C" }}>{data?.seeProfile?.bio}</Row>
          </Column>
        </Header>
      )}

      {data?.seeProfile?.isMe && data?.seeProfile?.photos?.length === 0 && (
        <AddPhotoWrap>
          <img src={camera} alt="" />
          <span>Ваша галерея пуста. Добавьте фото</span>
          <ProfileBtn id="addPhotoBtn" onClick={addPhoto}>
            Добавить фото
          </ProfileBtn>
        </AddPhotoWrap>
      )}

      {!popupPosts && (
        <>
          <Grid>
            {data?.seeProfile?.photos
              .slice()
              .reverse()
              .map((photo) => (
                <Photo
                  style={{ cursor: "pointer" }}
                  key={photo.id}
                  bg={photo.file}
                  onClick={() => {
                    setLoadingPopupPosts(true)
                    setPopupPosts(photo.id)
                  }}
                >
                  {/* <Icons> 
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
                  </Icons>*/}
                </Photo>
              ))}
          </Grid>
          <div
            className="modal fade"
            id="confirmModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="confirmModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-secondary"
                    id="confirmModalLabel"
                  >
                    Вы уверены, что хотите отписаться?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  После отмены подписки на пользователя вы утратите возможность
                  взаимодействия с ним.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Нет
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={unfollowUser}
                  >
                    Да
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!isMobile && popupPosts && (
        <Header
          style={{
            width: "585px",
            border: "none",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          <BtnSettings
            onClick={() =>
              !popupPosts ? history.goBack() : setPopupPosts(false)
            }
          >
            Вернуться в профиль
          </BtnSettings>
        </Header>
      )}

      {popupPosts && (
        <div
          id="post_wrap"
          className="mobilePostContainer"
          style={{
            width: "585px",
            opacity: `${loadingPopupPosts ? 0 : 1}`,
          }}
        >
          {data?.seeProfile?.photos
            .slice()
            .reverse()
            .map((post) => {
              const user = {
                avatar: data.seeProfile.avatar,
                username: data.seeProfile.username,
                official: data.seeProfile.official,
              }
              const props = {
                ...post,
                user: user,
                isMine: data.seeProfile.isMe,
              }
              return (
                <div className="popupPost" key={post.id} id={`post_${post.id}`}>
                  <Post {...props} />
                </div>
              )
            })}
        </div>
      )}
    </StyledProfileContainer>
  )
}

const StyledProfileContainer = styled.div`
  margin-top: 65px;
  .mobilePostContainer {
    flex: 1;
    margin: 0 auto;
  }
  .popupPost:last-child {
    min-height: calc(100dvh - 123px);
  }
  @media (max-width: 768px) {
    overflow: auto;
    margin-top: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    height: calc(100dvh - 60px);
    .mobilePostContainer {
      overflow: auto;
    }
  }
  @media (min-width: 768px) {
    max-height: calc(100dvh);
    .mobilePostContainer {
      padding-bottom: 65px;
    }
  }
`

const MobHeader = styled.div`
  display: none;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 70px;

  .header {
    width: 100%;
    display: flex;
    padding: 16px;
    align-items: center;
    //position: relative;
    justify-content: center;
    border-bottom: 1px solid #f2f2f7;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 1;
  }
  .btnMenu {
    right: 16px;
    position: absolute;
  }
  .formBtnBack {
    left: 16px;
    position: absolute;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`

const Header = styled.div`
  display: flex;
  .btnBackProfile {
    padding: 12px;
    border: none;
    background-color: #f2f2f7;
  }
  .formBtnBack {
    margin-right: 50px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-right: 52px;
  object-fit: cover;
  background-color: #2c2c2c;
  @media (max-width: 768px) {
    margin: 0;
    width: 90px;
    height: 90px;
    margin-top: 12px;
  }
  @media (max-width: 768px) {
`
const Column = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 32px);
    margin: 16px 16px 0 16px;
  }
`
const Username = styled.h3`
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 15px;
    font-weight: 500;
  }
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  @media (max-width: 640px) {
    justify-content: center;
    text-align: center;
  }
  @media (min-width: 768px) {
    margin-bottom: 12px;
  }
`
const List = styled.ul`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`
const Item = styled.li`
  margin-right: 20px;
  @media (max-width: 768px) {
    gap: 2px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    p {
      color: #1f1f2c;
      font-size: 17px;
      font-weight: 500;
    }
    span {
      color: #76768c;
      font-size: 13px;
      font-weight: 400;
    }
  }
  @media (min-width: 768px) {
    margin-right: 17px;
    p,span {
      color: #1f1f2c;
      font-size: 16px;
      font-weight: 500;
  }
`
const Value = styled(BoldText)`
  font-size: 18px;
`
const Name = styled(BoldText)`
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 17px;
  }
  @media (min-width: 768px) {
    color: #76768c;
    font-size: 16px;
    font-weight: 600;
  }
`

const AddPhotoWrap = styled.div`
  gap: 12px;
  display: flex;
  max-width: 315px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 150px auto 0 auto;
  img {
    width: 76px;
  }
  #addPhotoBtn {
    margin: 0;
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const Grid = styled.div`
  gap: 20px;
  display: grid;
  margin-top: 50px;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    flex: 1;
    gap: 5px;
    padding: 0;
    max-width: 100vw;
    margin: 32px 0 -16px 0;
    grid-auto-rows: calc(33.33vw - 3.33px);
    grid-template-columns: repeat(3, calc(33.33vw - 3.33px));
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

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-left: 10px;
  margin-top: 0px;
  padding: 8px 10px;
  cursor: pointer;
  max-width: 300px;
  @media (max-width: 1024px) {
    margin: 0;
    border: 0;
    display: flex;
    max-width: none;
    align-items: center;
  }
`

const BtnSettings = styled(DefaultButton).attrs({
  as: "span",
})`
  gap: 6px;
  border: none;
  display: flex;
  cursor: pointer;
  margin-top: 0px;
  padding: 8px 12px;
  background: #f2f2f7;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 15px;
  * {
    color: #76768c !important;
  }
  @media (max-width: 768px) {
    margin: 0;
    color: #76768c;
    background: #f2f2f7;
  }
  @media (min-width: 768px) {
    font-size: 15px;
    height: auto;
    width: auto;
    padding: 10px 12px;
  }
`

export const MobBtns = styled.div`
  gap: 8px;
  display: flex;
  * {
    margin: 0 !important;
  }
`

const ChatBtn = styled(DefaultButton).attrs({
  as: "span",
})`
  margin: 0;
  border: 0;
  display: flex;
  align-items: center;

  margin-top: 0px;
  cursor: pointer;
  margin-left: 10px;
  padding: 8px 10px;
  width: min-content;

  background: linear-gradient(
    269.53deg,
    #fe2db7 5.8%,
    #2936ff 47.41%,
    #6cf2fe 96.11%
  );
`

export default Profile
