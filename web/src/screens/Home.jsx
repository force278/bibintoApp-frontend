import { Link, Switch, Route, useLocation } from "react-router-dom"
import styled from "styled-components"
import PageTitle from "../components/PageTitle"
import RecomendationAside from "../components/aside/RecomendationAside"
import IconLogo from "../assets/img/bibinto.svg"
import SearchIcon from "../assets/icons/searchBlack.svg"
import RecommendationList from "../components/feed/RecommendationList"
import FeedList from "./FeedList"

const MobLogoWrap = styled.div`
  margin: 10px auto;
  max-width: 72px;
  object-fit: contain;
  img {
    width: 100%;
  }
`

const StyledSubHeader = styled.div`
  // display: grid;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.1px;
  color: rgba(0, 0, 0, 0.4);
  padding: 38px 20px 28px 20px;
  // grid-template-columns: 1fr auto 1fr;
  .active {
    color: #000;
  }
  @media (max-width: 768px) {
    padding: 12px 20px 20px 20px;
    a {
      font-size: 18px;
      line-height: 100%;
    }
  }
`

function Home() {
  const useActiveLink = (path) => {
    const location = useLocation()
    return location.pathname === path
  }
  const isRecommendationsActive = useActiveLink("/recommendations")
  const isSubscriptionsActive = useActiveLink("/")

  return (
    <>
      <PageTitle title="Лента" />
      <div className="isMobile">
        <MobLogoWrap>
          <img src={IconLogo} alt="" style={{ marginLeft: "13px" }} />
        </MobLogoWrap>
        <div className="p-2">
          <Link to="/users">
            <img src={SearchIcon} alt="searchLogo" />
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <StyledSubHeader>
            <Link
              to="/"
              // style={{ justifySelf: "end" }}
              className={isSubscriptionsActive ? "active" : ""}
            >
              Подписки
            </Link>
            <span className="ps-2 pe-2">
              <svg
                width="1"
                height="14"
                viewBox="0 0 1 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.5V1.5"
                  stroke="#D8D8DC"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <Link
              to="/recommendations"
              // style={{ justifySelf: "start" }}
              className={isRecommendationsActive ? "active" : ""}
            >
              Рекомендации
            </Link>
          </StyledSubHeader>
          <Switch>
            <Route exact path="/">
              <div className="mobilePostContainer" style={{ width: "585px" }}>
                <FeedList />
              </div>
            </Route>
            <Route exact path="/recommendations">
              <div className="mobilePostContainer" style={{ width: "585px" }}>
                <RecommendationList />
              </div>
            </Route>
          </Switch>
        </div>
        <RecomendationAside currentUsername="" />
      </div>
    </>
  )
}
export default Home
