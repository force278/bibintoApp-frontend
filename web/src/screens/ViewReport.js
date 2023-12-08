import React, { useEffect } from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import Post from "../components/feed/Post"
import PageTitle from "../components/PageTitle"
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../fragments"

const SEE_REPORT_QUERY = gql`
  query getReport {
    getReport {
      ...PostFragment
      caption
      comments {
        ...CommentFragment
      }
      user {
        username
        avatar
      }
      createdAt
      isMine
      isLiked
      isDisliked
    }
  }
  ${POST_FRAGMENT}
  ${COMMENTS_FRAGMENT}
`

const StyledSubHeader = styled.div`
  font-weight: 700;
  font-size: 20px;
  font-family: Nexa, sans-serif;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  padding: 19px 0;
  color: rgba(0, 0, 0, 0.4);
  &:hover {
    cursor: pointer;
  }

  .active {
    color: #000;
  }
`

function ViewReport() {
  const data = useQuery(SEE_REPORT_QUERY)

  return (
    <>
      <PageTitle title="Жалобы" />
      <div className="d-flex justify-content-center">
        <div>
          <Route exact path="/report">
            <div className="mobilePostContainer" style={{ width: "585px" }}>
              {data?.getReport?.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </Route>
        </div>
      </div>
    </>
  )
}
export default ViewReport
