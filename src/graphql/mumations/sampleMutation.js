import { gql } from '@apollo/client'

export default gql`
  mutation AddUser($name: String) {
    addUser(name: $name) {
      id
      name
    }
  }
`
