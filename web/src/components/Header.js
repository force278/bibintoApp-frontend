// TODO: Поудалять ненужные переменные
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import userIcon from "../assets/img/user.svg";
import likeIcon from "../assets/img/like.svg";
import uploadIcon from "../assets/img/upload.svg";
import messageIcon from "../assets/img/Message.svg";
import homeIcon from "../assets/img/home.svg";
import logo from "../assets/img/bibinto.svg"
import { isLoggedInVar } from "../apollo";
import useMe from "../hooks/useMe";
import routes from "../routes";
import UploadPopUp from "../screens/UploadPopUp";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 100;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

const StyledFileInputLabel = styled.label`
  cursor: pointer;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const handleShowModal = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };
  const logOut = () => {
    //TODO: ужасное решение, все нужно переписать
    localStorage.removeItem('TOKEN')
    history.push('/');
    window.location.reload();
  }

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutsideModal);

    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  }, []);

  const [uploadModalActive, setUploadModalActive] = useState(false);

  useEffect(() => {
    if (history.location.search.includes("upload=true")) {
      console.log("true");
      setUploadModalActive(true);
    } else {
      console.log("false");
      setUploadModalActive(false);
    }
  }, [history.location.search]);

  const handleUploadImage = () => {
    history.push({
      search: "?upload=true",
    });
    setUploadModalActive(true);
  };

  const handleClosePopUp = useCallback(() => {
    history.replace({
      search: "",
    });
    setUploadModalActive(false);
  }, [history]);

  return (
    <>
      <SHeader>
        <Wrapper>
          <Column>
            <Link to={routes.home}>
              <div>
                <img src={logo} width='100' alt='Бибинто'></img>
              </div>
            </Link>
          </Column>

          {/* TODO: Реализовать строку поиска (min: стили) */}

          <Column>
            {isLoggedIn ? (
              <IconContainer>
                <Icon>
                  <Link to={routes.home}>
                    <img src={homeIcon} alt='home' />
                  </Link>
                </Icon>
                <Icon>
                  <Link to={routes.home}>
                    <img src={messageIcon} alt='message' />
                  </Link>
                </Icon>
                {/* TODO: стилизовать input */}
                <Icon>
                  <StyledFileInput
                    id='imageInput'
                    type='file'
                    accept='image/jpeg, image/png'
                    onChange={handleUploadImage}
                  />
                  <StyledFileInputLabel htmlFor='imageInput'>
                    <img src={uploadIcon} alt='upload' />
                  </StyledFileInputLabel>
                </Icon>
                <Icon>
                  <Link to={routes.home}>
                    <img src={likeIcon} alt='like' />
                  </Link>
                </Icon>
                <Icon>
                  {/*<Link to={`/users/${data?.me?.username}`}>*/}
                  <button className="border-0 bg-transparent" onClick={handleShowModal}>
                    <img src={userIcon} alt='user' />
                  </button>
                  <div className={`position-relative ${showModal? 'd-block' : 'd-none'}`}>
                    <div className="position-absolute"
                         style={{
                           width: '250px',
                           height: '130px',
                           background: '#F4F4F4',
                           borderRadius: '17px',
                           top:'66px',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                    }}>
                      {showModal && (
                          <div className="d-flex flex-column" ref={modalRef}>
                            <button className="m-2 z-2 border-0 p-3 bg-white rounded">
                              <Link to={`/users/${data?.me?.username}`}>
                                Мой профиль
                              </Link>
                            </button>
                            <button className="m-2 z-2 border-0 p-3 bg-white text-danger rounded" onClick={logOut}>
                              <Link to={`/users/${data?.me?.username}`}>
                                Выйти из профиля
                              </Link>
                            </button>
                          </div>
                      )}
                    </div>
                  </div>
                  {/*</Link>*/}
                </Icon>
              </IconContainer>
            ) : (
              <Link href={routes.home}>
                <Button>Войти</Button>
              </Link>
            )}
          </Column>
        </Wrapper>
      </SHeader>

      {uploadModalActive && <UploadPopUp onClose={handleClosePopUp} />}
    </>
  );
}
export default Header;
