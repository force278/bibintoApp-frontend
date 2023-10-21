import { gql, useLazyQuery } from "@apollo/client"
import searchGray from "../assets/img/header/searchGray.svg"
import { useState } from "react"
import Avatar from "./Avatar"

const SEARCH_QUERY = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      username
      avatar
    }
  }
`

function Search() {
  const [search] = useLazyQuery(SEARCH_QUERY)
  const [inputState, setInputState] = useState("")

  return (
    <div className="d-flex flex-row">
      <div className="inputSearch hideElement">
        <input
          type="text"
          className="inputSearch__input"
          placeholder="Поиск"
          onChange={(e) => {
            setInputState(e.target.value)
          }}
        />
        <img src={searchGray} alt="search" className="inputSearch__icon" />
      </div>
      {inputState ? (
        <div className="d-flex flex-row">
          {search({ variables: { keyword: inputState } }).then((resp) => {
            resp.data.searchUsers.map((item, index) => {
              return (
                <div key={index}>
                  <Avatar url={item.avatar}></Avatar>
                  <h4>{item.username}</h4>
                </div>
              )
            })
          })}
        </div>
      ) : null}
    </div>
  )
}

export default Search
