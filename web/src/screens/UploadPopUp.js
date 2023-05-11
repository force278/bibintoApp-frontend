import React, { useState } from "react";

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

const AddDB = ({ data }) => {
  const [state, setState] = useState(null);

  const [uploadDB] = useMutation(POST_PHOTO, {
    variables: { file: data },
  });

  if (!state) {
    uploadDB();
    setState(true);
  }

  return (
    <div>
      <img src={data} alt='Фото' />
    </div>
  );
};

const PostImage = ({ data }) => {
  const [state, setState] = useState(null);

  async function UploadPhoto(data) {
    const imageInput = document.querySelector("#imageInput");

    const file = imageInput.files[0];

    const res = await fetch(data.getUrlUploadPhoto, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = data.getUrlUploadPhoto.split("?")[0];

    setState(imageUrl);
  }

  if (!state) {
    UploadPhoto(data);
    return <p>Загрузка</p>;
  } else return <AddDB data={state} />;
};

const UploadImage = () => {
  const [getUploadUrl, { called, loading, data }] =
    useLazyQuery(URL_UPLOAD_QUERY);
  if (called && loading) return <p>Загрузка ...</p>;
  if (!called) {
    return <button onClick={() => getUploadUrl()}>Загрузить фото</button>;
  }
  return <PostImage data={data} />;
};

const UploadPopUp = () => {
  return <div>UploadPopUp</div>;
};

export default UploadPopUp;
