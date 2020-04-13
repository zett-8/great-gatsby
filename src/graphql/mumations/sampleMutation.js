import { gql } from 'apollo-boost'

export default gql`
  mutation AddUser($name: String) {
    addUser(name: $name) {
      id
      name
    }
  }
`
