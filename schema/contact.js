export default `
  type Contact {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    user: User!
  }

  type Query {
    getContact(id: Int!): Contact!
    getAllContacts: [Contact!]!
  }

  type ContactResponse {
    ok: Boolean!
    errors: [Error!]
    contact: Contact
  }

  type Mutation {
    createContact(firstName: String!, lastName: String, email: String): ContactResponse!
    updateContact(id: Int!, firstName:String, lastName: String, email: String): ContactResponse!
    deleteContact(id: Int!): ContactResponse!
  }
`;
