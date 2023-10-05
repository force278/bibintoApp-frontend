import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
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
import searchGray from "../assets/img/header/searchGray.svg"


export function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const uploadInputRef = useRef(null);
  const handleShowModal = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };
  const logOut = () => {
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
      setUploadModalActive(true);
    } else {
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
      <div className="w-100 border-bottom bg-white pt-3 pb-3 d-flex align-items-center justify-content-center position-fixed z-1 headerMobile"
           style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="w-100 d-flex justify-content-between align-items-center"
             style={{maxWidth: '930px'}}>
          <div className="d-flex justify-content-between w-100">
                {isLoggedIn ?(
                    <div className="d-flex align-items-center justify-content-between w-100 justifyContentCenterForMobile">
                      <div className="hideElement">
                        <Link to={routes.home}>
                          <div>
                            <img src={logo} width='100' alt='Бибинто'></img>
                          </div>
                        </Link>
                      </div>
                      <div className="inputSearch hideElement">
                        <input type="text" className="inputSearch__input" placeholder="Поиск" />
                        <img src={searchGray} alt="search" className="inputSearch__icon" />
                      </div>
                      <div className="d-flex" style={{gap: '35px'}}>
                        <span>
                        <Link to={routes.home}>
                          <img src={homeIcon} alt='home' />
                        </Link>
                      </span>
                        <span>
                        <Link to="message">
                          <img src={messageIcon} alt='message' />
                        </Link>
                      </span>
                        <span>
                        <input style={{opacity: 0, visibility: 'hidden', position: 'absolute'}} id='imageInput' type='file' accept='image/jpeg, image/png' ref={uploadInputRef} onChange={handleUploadImage} />
                        <label htmlFor='imageInput'>
                          <img src={uploadIcon} alt='upload' style={{cursor: "pointer"}} />
                        </label>
                      </span>
                        <span>
                        <Link to="likes">
                          <img src={likeIcon} alt='like' />
                        </Link>
                      </span>
                        <span >
                        <button className="border-0 bg-transparent" onClick={handleShowModal}>
                          <img src={userIcon} alt='user' />
                        </button>
                        <div className={`position-relative ${showModal? 'd-block' : 'd-none'}`}>
                          <div className="position-absolute modalWindowForMobile"
                               style={{
                                 width: '250px',
                                 height: '130px',
                                 background: '#F4F4F4',
                                 borderRadius: '17px',
                                 top:'66px',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                               }}>
                            {showModal && (
                                <div className="d-flex flex-column" ref={modalRef}>
                                  <button className="m-2 z-2 border-0 p-3 bg-white" style={{borderRadius: '11px'}}>
                                    <Link to={`/${data?.me?.username}`} onClick={handleShowModal}>
                                      Мой профиль
                                    </Link>
                                  </button>
                                  <button className="m-2 z-2 border-0 p-3 bg-white text-danger" style={{borderRadius: '11px'}} onClick={logOut}>
                                    <Link to={`/${data?.me?.username}`}>
                                      Выйти из профиля
                                    </Link>
                                  </button>
                                </div>
                            )}
                          </div>
                        </div>
                      </span>
                      </div>

                    </div>
                ):(<Link href={routes.home}>
                    <button className="bg-danger text-white pt-2 pb-2 ps-3 pe-3 font-weight-bold" style={{borderRadius: '4px'}}>Войти</button>
                  </Link>
                )}
          </div>
        </div>
      </div>

      {uploadModalActive && <UploadPopUp onClose={handleClosePopUp} uploadInputRef={uploadInputRef} />}
    </>
  );
}
