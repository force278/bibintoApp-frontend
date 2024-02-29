import styled from "styled-components"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./messenger.scss"
import mesViewed from "../../assets/img/messenger/mesViewed.svg"
import mesNotViewed from "../../assets/img/messenger/mesNotViewed.svg"
import { Avatar } from "@mui/material"
import Chat from "./Chat"

const MessengerMob = ({ user, history, curChatMes, dialoguesList }) => {
  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className="onlyMob">
      {!user ? (
        <MessengerWrap>
          <div className="header">
            <button
              type="button"
              onClick={handleBack}
              className="formBtnBack"
            ></button>
            <p className="username">Сообщения</p>
          </div>
          <ul className="dialogues">
            {dialoguesList.length === 0 && (
              <p
                style={{ padding: "16px", color: "#76768c" }}
                className="title"
              >
                Диалогов пока нет
              </p>
            )}
            {dialoguesList.map((dialogue, index) => {
              const lastMes = [...dialogue.messages].sort(
                (a, b) => b.id - a.id,
              )[0]
              const companion = dialogue.users.find((user) => !user.isMe)
              const unreadTotal = dialogue.messages?.length
                ? dialogue.messages.filter((mes) => !mes.user.isMe && !mes.read)
                    .length
                : 0
              return (
                <li className="dialogue" key={index}>
                  <Link to={`/${companion.username}`}>
                    <div className="avatarWrap">
                      <Avatar src={companion.avatar} />
                    </div>
                  </Link>
                  <Link
                    to={`/me?${"user=" + companion.username}`}
                    style={{ flex: 1 }}
                  >
                    <div className="info">
                      <p className="username">{companion.username}</p>
                      <p className="message">{lastMes.payload}</p>
                    </div>
                  </Link>
                  <div className="statusWrap">
                    <div className="status">
                      {lastMes.user.isMe && lastMes.read && (
                        <img src={mesViewed} alt="" />
                      )}
                      {lastMes.user.isMe && !lastMes.read && (
                        <img src={mesNotViewed} alt="" />
                      )}
                      {!lastMes.user.isMe && unreadTotal ? (
                        <span className="statusUnread">{unreadTotal}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </MessengerWrap>
      ) : (
        <Chat username={user} messages={curChatMes} />
      )}
    </div>
  )
}
// }

export default MessengerMob

// const FormContainer = styled.div`
//   left: 0;
//   right: 0;
//   bottom: 60px;
//   height: 73px;
//   display: flex;
//   position: fixed;
//   padding-bottom: 10px;
//   background-color: #fff;
//   padding: 16px 16px 24px 16px;
//   border-top: 1px solid ${(props) => props.theme.borderColor};
//   .formWrap {
//     gap: 8px;
//     width: 100%;
//     display: flex;
//   }
//   input {
//     border-radius: 30px;
//     background-color: #f2f2f7;
//     padding: 7px 15px 8px 15px;
//   }
//   .btnSubmit {
//     margin: 0;
//     padding: 0;
//     width: 32px;
//     height: 32px;
//     border: none;
//     display: flex;
//     flex-shrink: 0;
//     min-width: 32px;
//     align-items: center;
//     border-radius: 100%;
//     background: #1877f2;
//     justify-content: center;
//     img {
//       width: 16px;
//       height: 16px;
//     }
//   }
// `
export const MessengerWrap = styled.div`
  height: calc(100% - 133px);
  overflow: auto;
  .formBtnBack {
    position: static;
  }
  .username {
    text-align: center;
  }
  .header {
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
  }
`

export const FormInput = styled.input`
  width: 100%;
  border: none;
  &::placeholder {
    font-size: 14px;
    color: #76768c;
  }
  &:focus {
    outline: none;
  }
`
