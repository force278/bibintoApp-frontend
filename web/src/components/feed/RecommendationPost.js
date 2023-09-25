import {
    More,
    PostAction,
    PostContainer,
    PostContent,
    PostFooter,
    PostHeader,
    Username
} from "./Post";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import moreIcon from "../../assets/img/More.svg";
import Modal from "../modal/Modal";
import ModalContent from "../modal/ModalContent";
import React, { useState } from "react";
import {
    faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!, $value: Int!) {
        toggleLike(id: $id, value: $value) {
            ok
            error
        }
    }
`;

export function RecommendationPost(
    {
        id,
        user,
        file,
        isLiked,
        isDisliked,
        isMine,
    }
){
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;
        if (ok) {
            const fragmentId = `Photo:${id}`;
            cache.modify({
                id: fragmentId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    isDisliked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return isDisliked ? prev : prev - 1;
                        } else {
                            return isDisliked ? prev + 1 : prev;
                        }
                    },
                },
            });
        }
    };

    const [activeModal, setActiveModal] = useState(false);
    const [addLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: { id, value: 10 },
        update: updateToggleLike,
    });
    const [addDislike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {id, value: 1},
        update: updateToggleLike,
    })


    return(
        <PostContainer key={id}>
            <PostHeader>
                <Link to={`/${user?.username}`}>
                    <Avatar url={user?.avatar} lg={true} />
                </Link>
                <Link to={`/${user?.username}`}>
                    <Username>{user?.username}</Username>
                </Link>
                <More onClick={() => setActiveModal(true)}>
                    <img src={moreIcon} alt="more" />
                </More>
            </PostHeader>
            <PostContent src={file} />
            <PostFooter>
                <div className="d-flex justify-content-around">
                    <PostAction onClick={addLike}>
                        <FontAwesomeIcon
                            style={{ color: isLiked ? "#F0355B" : "inherit",
                                fontSize: '27px',
                                transition: '0.5s ease'
                        }}
                            icon={isLiked ? SolidHeart : faHeart}
                        />
                    </PostAction>
                    <PostAction onClick={addDislike}>
                        <FontAwesomeIcon
                            style={{ opacity: isDisliked ? 1 : 0.3,
                                fontSize: '27px',
                                transition: '0.5s ease'
                            }}
                            icon={isDisliked ? faHeartBroken : faHeartBroken}
                        />
                    </PostAction>
                </div>
            </PostFooter>
            <Modal active={activeModal} setActive={setActiveModal}>
                <ModalContent
                    id={id}
                    isMine={isMine}
                />
            </Modal>
        </PostContainer>
    )
}