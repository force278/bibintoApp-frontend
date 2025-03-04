import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { useEffect } from "react"
import { isLoggedInVar, LogoutUser } from "../apollo"

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      official
      admin
    }
  }
`

function useMe() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const { data } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  })
  useEffect(() => {
    if (data?.me === null) LogoutUser()
  }, [data])
  return { data }
}

export default useMe
