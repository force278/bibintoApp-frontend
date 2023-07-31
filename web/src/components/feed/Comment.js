import PropTypes from "prop-types";
import styled from "styled-components";
import { BoldText } from "../shared";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import more from "../../assets/img/post/more.svg";
import remove from "../../assets/img/post/remove.png"
import edit from "../../assets/img/post/edit.svg"
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
  const editText = () => {
    alert("Редактирование текста пока что невозможно")
  }
  return (
    <div className="d-flex justify-content-between mb-2">
      <div>
        <Link to={`/users/${author}`}>
          <BoldText>{author}</BoldText>
        </Link>
        <CommentCaption>
          {payload?.split(" ").map((word, index) =>
              /#[а-яА-Я]+/.test(word) ? (
                  <span key={index}>
                    <Link to={`/hashtags/${word}`}>{word}</Link>
                  </span>
              ) : (
                  <span key={index}>{word}</span>
              )
          )}
        </CommentCaption>
      </div>
      <div>
        {isMine ? <button className="border-0 bg-transparent" onClick={handleShowModal}>
          <img className="cursor-pointer" style={{width: '12px'}} src={more} alt="Удалить"/>
        </button> : null}
      </div>
      {showModal && (
          <div ref={modalRef}>
            <button className="text-secondary border-0 bg-transparent" onClick={onDeleteClick}>
              <img src={remove} alt="удалить" className="cursor-pointer" style={{width: '13px'}}/>
            </button>
            <button className="text-warning border-0 bg-transparent" onClick={editText}>
              <img src={edit} alt="редактировать" className="cursor-pointer" style={{width: '13px'}} />
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
