import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { getMainDefinition } from "@apollo/client/utilities"

const TOKEN = "TOKEN"
const DARK_MODE = "DARK_MODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)))

export const LoginUser = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}

export const LogoutUser = () => {
  localStorage.removeItem(TOKEN)
  window.location.reload()
}

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled")
  darkModeVar(true)
}

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE)
  darkModeVar(false)
}

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://api.bibinto.com/"
      : "https://api.bibinto.com/",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  }
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://ws.bibinto.com/",
    connectionParams: {
      token: localStorage.getItem(TOKEN),
    },
  }),
)

const httpLinks = authLink.concat(httpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLinks,
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
})
