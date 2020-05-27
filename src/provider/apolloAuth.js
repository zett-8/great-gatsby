import React, { useEffect, useState, createContext } from 'react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-fetch'
import useFirebase from './firebase'

export let Context = createContext(null)

const ApolloAuth = (props) => {
  const firebase = useFirebase()
  const [userAuthInfo, setUserAuthInfo] = useState('')
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']

        if (hasuraClaim) {
          setUserAuthInfo({
            uid: user.uid,
            email: user.email,
            token,
          })
        } else {
          const userRef = firebase.firestore.collection('user_meta').doc(user.uid)
          userRef.onSnapshot(async () => {
            const token = await user.getIdToken(true)
            setUserAuthInfo({
              uid: user.uid,
              email: user.email,
              token,
            })
          })
        }

        setAuthLoaded(true)
      } else {
        setUserAuthInfo('')
        setAuthLoaded(true)
      }
    })
    // eslint-disable-next-line
  }, [])

  const client = new ApolloClient({
    uri: '',
    headers: userAuthInfo
      ? {
          Authorization: `Bearer ${userAuthInfo.token}`,
        }
      : {},
    cache: new InMemoryCache({
      dataIdFromObject: (o) => o.id,
    }),
    fetch,
  })

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={{ authLoaded, userAuthInfo }}>{props.children}</Context.Provider>
    </ApolloProvider>
  )
}

export default ApolloAuth
