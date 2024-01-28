import { Route } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import ReportPost from "../components/feed/ReportPost"
import PageTitle from "../components/PageTitle"
import CircularProgress from "@mui/material/CircularProgress"

const SEE_REPORT_QUERY = gql`
  query getReport {
    getReport {
      id
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

function ViewReport() {
  const data = useQuery(SEE_REPORT_QUERY)

  return (
    <>
      <PageTitle title="Жалобы" />
      <div className="d-flex justify-content-center">
        <div>
          <Route exact path="/report">
            <div className="mobilePostContainer" style={{ width: "585px" }}>
              {data.loading && data.called ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {data.data.getReport === [] ? (
                    data.data.getReport.map((report) => (
                      <ReportPost
                        key={report.id}
                        id={report.id}
                        user={report.photo.user}
                        file={report.photo.file}
                      />
                    ))
                  ) : (
                    <div>Пока жалоб нет</div>
                  )}
                </>
              )}
            </div>
          </Route>
        </div>
      </div>
    </>
  )
}
export default ViewReport
