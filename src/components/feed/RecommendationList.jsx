import { useEffect} from "react"
import { gql, useQuery } from "@apollo/client"
import { useInView } from "react-intersection-observer"
import { COMMENTS_FRAGMENT, POST_FRAGMENT } from "../../fragments"
import { RecommendationPost } from "./RecommendationPost"
import  Post from "./Post"

const GET_REC_HISTORY_QUERY = gql`
  query getRecHistory($offset: Int!) {
    getRecHistory(offset: $offset) {
      ...PostFragment
      comments {
        ...CommentFragment
      }
      caption
      user {
        username
        avatar
        official
        isFollowing
      }
      createdAt
      isMine
      isLiked
      isDisliked
    }
  }
  ${POST_FRAGMENT},
  ${COMMENTS_FRAGMENT}
`

const GET_REC_QUERY = gql`
  query getRec {
    getRec {
      ...PostFragment
      caption
      user {
        username
        avatar
        official
        isFollowing
      }
      createdAt
      isMine
      isLiked
      isDisliked
    }
  }
  ${POST_FRAGMENT}
`

function RecommendationList() {
  const rec_data = useQuery(GET_REC_QUERY)

  const rec_history_data = useQuery(GET_REC_HISTORY_QUERY, {
    variables: { offset: 0 },
  })

  // объект при виде которого меняется inView на true
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      rec_history_data.fetchMore({
        variables: { offset: rec_history_data.data.getRecHistory.length + 5 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.getRecHistory.length == 0) {
            const endOfRec = document.getElementById("endOfRec")
            endOfRec.remove()
            return prev
          }
          return {
            getRecHistory: [
              ...prev.getRecHistory,
              ...fetchMoreResult.getRecHistory,
            ],
          }
        },
      })
    }
  }, [inView])

  return (
    <>
      {rec_data?.called && !rec_data.loading && rec_data.data.getRec ? (
        <RecommendationPost
          key={rec_data.data.getRec.id}
          {...rec_data.data.getRec}
          photo={rec_data.data.getRec}
          rec_history_data={rec_history_data}
        />
      ) : null}
      {rec_history_data?.data?.getRecHistory?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      {!rec_history_data.loading && (
        <div ref={ref} id="endOfRec" style={{ textAlign: "center" }}>
          Загрузка...
        </div>
      )}
    </>
  )
}

export default RecommendationList
