import { StyledHeader, StyledList } from "./Notifications";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import Search from "../components/Search";
import {useState} from "react";
import defaultAvatar from "../assets/img/DefaultAvatar.png";
import {Avatar} from "@mui/material";



const WrappperItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const UsersWrap = styled.div`
  display: flex;
  border: 1px solid #0000001a;
  overflow: hidden;
  flex-direction: column;
  height: calc(100dvh - 60px);
  @media (min-width: 768px) {
    width: 1000px;
    height: 80vh;
    max-width: 100%;
    margin-top: 38px;
    background: #fff;
  }
`

const StyledItem = styled.div`
  gap: 8px;
  display: flex;
  padding: 5px;
  border-radius: 12px;
  align-items: flex-start;
  box-shadow: 0 0 20px 0 #9797BD26;
    .textWrap {
    margin-top: 6px;
    flex: 1;
  }
  p {
    font-size: 15px;
    font-weight: 500;
  }
  span {
    font-size: 13px;
    color: #76768c;
  }
`


export const SearcherUsersMobile = () => {
    const history = useHistory()

    const [users, setUsers] = useState([])

    const handleSearchResults = (searchResults) => {
        setUsers(searchResults)
    }

    return(
        <UsersWrap>
            <StyledHeader>
                <button
                    type="button"
                    className="formBtnBack"
                    onClick={() => history.goBack()}
                ></button>
                <p>Поиск</p>
            </StyledHeader>
            <StyledHeader>
                <Search onSearchResults={handleSearchResults} showList={false}/>
            </StyledHeader>
            <StyledList id="notific_list">
                <WrappperItems>
                    {users.length > 0 &&
                        users.map((item, index) => (
                            <>
                                {item?.username ? (
                                        <StyledItem key={index}>
                                            <Link to={`/${item?.username}`}>
                                                <Avatar src={item?.avatar || defaultAvatar} />
                                            </Link>
                                            <div className="textWrap">
                                                <Link to={`/${item?.username}`}>
                                                    <p>{item?.username}</p>
                                                </Link>
                                                <span style={{fontSize: '11px'}}>
                                                    {item?.firstName} {item?.lastName}
                                                </span>
                                            </div>
                                        </StyledItem>

                                ) : (
                                    <div>Ничего не обнаружено</div>
                                )}
                            </>))}
                    {
                        users.length === 0 && (
                            <span className="d-flex justify-content-center mt-5">Ничего не обнаружено</span>
                        )
                    }
                </WrappperItems>
            </StyledList>
        </UsersWrap>
    )
}