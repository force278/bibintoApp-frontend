import React, { useEffect } from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import ReportPost from "../components/feed/ReportPost"
import PageTitle from "../components/PageTitle"

const SEE_REPORT_QUERY = gql`
  query getReport {
    getReport {
      photo {
        id
        file
        user {
          id
          username
          avatar
          official
        }
      }
    }
  }
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
  console.log(data)

  return (
    <>
      <PageTitle title="Жалобы" />
      <div className="d-flex justify-content-center">
        <div>
          <Route exact path="/report">
            <div className="mobilePostContainer" style={{ width: "585px" }}>
              {data?.data?.getReport?.map((report) => (
                <ReportPost
                  key={report.id}
                  user={report.photo.user}
                  file={report.photo.file}
                />
              ))}
            </div>
          </Route>
        </div>
      </div>
    </>
  )
}
export default ViewReport
