import PropTypes from "prop-types";
import styled from "styled-components";
import { BoldText } from "../shared";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import more from "../../assets/img/post/more.svg";
import {useState} from "react";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  overflow-wrap: anywhere;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;


function Comment({ id, isMine, photoId, author, payload }) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const handleShowModal = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict(`Comment:${id}`);
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentsNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };


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

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteComment();
  };
  return (
    <div className="d-flex justify-content-between mb-2 position-relative">
      <div>
        <Link to={`/${author}`}>
          <BoldText>{author}</BoldText>
        </Link>
        <CommentCaption>
          {payload?.split(" ").map((word, index) => (
              <span key={index}>
                {/#[а-яА-Я]+/.test(word) ? (
                    <Link to={`/hashtags/${word}`}>{word}</Link>
                ) : (
                    `${word} `
                )}
              </span>
          ))}
        </CommentCaption>
      </div>
      <div>
        {isMine ? <button className="border-0 bg-transparent" onClick={handleShowModal}>
          <img className="cursor-pointer" style={{width: '12px'}} src={more} alt="Удалить"/>
        </button> : null}
      </div>
      {showModal && (
          <div className="position-absolute d-flex flex-column justify-content-around z-2 buttonMoreForMobile" ref={modalRef}
               style={{
                 borderRadius: '17px',
                 right: "-60px",
                 top: "25px",
                 filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',}}>
            <button className="text-danger border-0 p-2 ms-2 me-2 rounded" onClick={onDeleteClick}>
              Удалить
            </button>
          </div>
      )}

    </div>
  );
}

export default Comment;

Comment.propTypes = {
  id: PropTypes.number,
  isMine: PropTypes.bool,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string,
};
