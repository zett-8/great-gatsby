import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'
import gql from 'graphql-tag'

admin.initializeApp(functions.config().firebase)

const client = new ApolloClient({
  fetch,
  uri: functions.config().hasura.url,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-hasura-admin-secret': functions.config().hasura.admin_secret,
      },
    })
  },
})

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  try {
    // set custom claim
    await admin.auth().setCustomUserClaims(user.uid, customClaims)

    await client.mutate({
      variables: { id: user.uid, email: user.email || '' },
      mutation: gql`
        mutation InsertUsers($id: String, $email: String) {
          insert_users(objects: { id: $id, name: $name }) {
            returning {
              id
              name
              email
              created_at
            }
          }
        }
      `,
    })

    // at first signin, there will be slight delay between creating user and setting claim
    // so that set meta data for refresh
    await admin
      .firestore()
      .collection('user_meta')
      .doc(user.uid)
      .create({
        refreshTime: admin.firestore.FieldValue.serverTimestamp(),
      })
  } catch (e) {
    console.log(e)
  }
})
