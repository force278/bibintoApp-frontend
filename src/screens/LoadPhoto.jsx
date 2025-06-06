import PageTitle from "../components/PageTitle"
import styled from "styled-components"
import { BaseBox } from "../components/shared"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { Header } from "../components/Header"

const SFormBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin-bottom: 15px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width: 100%;
  }
`

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`

const POST_PHOTO = gql`
  mutation uploadPhoto($file: String!) {
    uploadPhoto(file: $file) {
      id
    }
  }
`

const AddDB = ({ data }) => {
  const [state, setState] = useState(null)
  const [uploadDB] = useMutation(POST_PHOTO, {
    variables: { file: data },
  })
  if (!state) {
    uploadDB()
    setState(true)
  }

  return (
    <div>
      <img src={data} alt="Фото" />
    </div>
  )
}

const PostImage = ({ data }) => {
  const [state, setState] = useState(null)

  async function UploadPhoto(data) {
    const imageInput = document.querySelector("#imageInput")

    const file = imageInput.files[0]

    await fetch(data.getUrlUploadPhoto, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    })

    const imageUrl = data.getUrlUploadPhoto.split("?")[0]

    setState(imageUrl)
  }

  if (!state) {
    UploadPhoto(data)
    return <p>Загрузка</p>
  } else return <AddDB data={state} />
}

const UploadImage = () => {
  const [getUploadUrl, { called, loading, data }] =
    useLazyQuery(URL_UPLOAD_QUERY)
  if (called && loading) return <p>Загрузка ...</p>
  if (!called) {
    return <button onClick={() => getUploadUrl()}>Загрузить фото</button>
  }
  return <PostImage data={data} />
}

function LoadPhoto() {
  return (
    <>
      <PageTitle title="Загрузка фото" />
      <Header />
      <SFormBox>
        <input id="imageInput" type="file" accept="image/jpeg, image/png" />
        <UploadImage />
      </SFormBox>
    </>
  )
}
export default LoadPhoto
