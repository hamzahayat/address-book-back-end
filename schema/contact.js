export default `
  type Contact {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    user: User!
  }
  type Query{
    getContact(id: Int!): Contact!
    getAllContacts(user_id: Int!): [Contact!]!
  }

  type CreateContactResponse {
    ok: Boolean!
    errors: [Error!]
  }
  type Mutation {
    addContact(firstName: String!, lastName: String!, email: String!): CreateContactResponse!
  }
`;
