import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

// TODO: Реализовать pop up

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`;

const POST_PHOTO = gql`
  mutation uploadPhoto($file: String!) {
    uploadPhoto(file: $file) {
      id
    }
  }
`;

// const Image = ({ data }) => {
//   return <img src={data} alt='Фото' />;
// };

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.data});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 0 32px;
`;

export const PostImage = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (data) {
      (async function (data) {
        const imageInput = document.querySelector("#imageInput");
        const file = imageInput.files[0];
        console.log(file, 'file')


        await fetch(data.getUrlUploadPhoto, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });

        const imageUrl = data.getUrlUploadPhoto.split("?")[0];

        setImageUrl(imageUrl);
      })(data);
    }
  }, [data]);

  if (!imageUrl) {
    return <p>Загрузка</p>;
  } else return <Image data={imageUrl} />;
};

// const UploadImage = () => {
//   const [getUploadUrl, { called, loading, data }] =
//     useLazyQuery(URL_UPLOAD_QUERY);
//   if (called && loading) return <p>Загрузка ...</p>;
//   if (!called) {
//     return <button onClick={() => getUploadUrl()}>Загрузить фото</button>;
//   }
//   return <PostImage data={data} />;
// };

export const UploadPopUp = ({ onClose }) => {
  const history = useHistory();

  const [getUploadUrl, { called, loading, data }] =
    useLazyQuery(URL_UPLOAD_QUERY);

  const [uploadDB] = useMutation(POST_PHOTO, {
    variables: { file: data?.getUrlUploadPhoto.split("?")[0] },
  });

  useEffect(() => {
    try {
      if (!called) {
        getUploadUrl();
      }
    } catch (error) {
      console.error(error);
    }
  }, [called, getUploadUrl]);

  const handleUploadPhoto = useCallback(() => {
    if (called && data) {
      uploadDB();
      onClose();
    }
  }, [called, data, onClose, uploadDB]);

  const handleGoBack = useCallback(() => {
    history.goBack();
    onClose();
  }, [history, onClose]);

  return (
    <StyledOverlay>
      <StyledPopUpContainer>
        <StyledPopUpHeader>
          <StyledBackButtonContainer>
            <StyledBackButton type='button' onClick={handleGoBack}>
              <StyledArrow className='arrow-left' />
            </StyledBackButton>
          </StyledBackButtonContainer>
          <StyledPopUpActionButton type='button' onClick={handleUploadPhoto}>
            Опубликовать
          </StyledPopUpActionButton>
        </StyledPopUpHeader>
        <StyledPopUpBody>
          <StyledPopUpLeft>
            {called && loading ? (
              <div>Загрузка...</div>
            ) : (
              <PostImage data={data} />
            )}
          </StyledPopUpLeft>
          <StyledPopUpRight>
            <StyledPopUpTextArea placeholder='Добавить описание...' />
          </StyledPopUpRight>
        </StyledPopUpBody>
      </StyledPopUpContainer>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

const StyledPopUpContainer = styled.div`
  background: #ffffff;
  border-radius: 32px;
  width: 90%;
  height: 90%;
  max-width: 90%;
  max-height: 90%;
`;

const StyledPopUpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #efefef;
  height: 61px;
  padding: 15px 25px;
`;

const StyledBackButtonContainer = styled.div`
  width: 30px;
  height: 30px;
`;

const StyledBackButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #9797bd;
  border-radius: 50%;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #262628;

  transition: all 0.3s ease;

  &:hover {
    background-color: #9797bd;
    color: #fff;

    & .arrow-left {
      transition: all 0.3s ease;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
    }

    transition: all 0.3s ease;
  }
`;

const StyledArrow = styled.div`
  width: 9px;
  height: 9px;
  border-top: 2px solid #262628;
  border-right: 2px solid #262628;
  margin-left: 4px;

  &.arrow-left {
    transform: rotate(225deg);
  }
`;

const StyledPopUpActionButton = styled.button`
  background-color: transparent;
  border: none;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  cursor: pointer;

  color: #2283f5;
`;

const StyledPopUpBody = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  height: calc(100% - 61px);
  max-height: calc(100% - 61px);
`;

const StyledPopUpLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //   background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 0 0 32px;

  & > img {
    object-fit: contain;
    height: 100%;
  }
`;

const StyledPopUpRight = styled.div`
  border-radius: 0 0 32px 0;
  height: 100%;
`;

const StyledPopUpTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 0 0 32px 0;
  resize: none;
  border: none;
  padding: 20px;
`;

export default UploadPopUp;
