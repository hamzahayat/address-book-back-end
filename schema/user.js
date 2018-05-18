export default `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    contacts: [Contact]!
  }
  type Query {
    getUser(id: Int!): User!
    getAllUsers: [User!]!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
    userName: String!
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
