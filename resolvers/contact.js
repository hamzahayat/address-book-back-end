// Import Auth and Errors Function
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    getContact: (parent, { id }, { models }) =>
      models.Contact.findOne({ where: { id } }),
    getAllContacts: (parent, args, { models, user }) =>
      models.Contact.findAll({ where: { user_id: user.id } }),
  },
  Mutation: {
    // Check if user has permission to add contact
    addContact: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          await models.Contact.create({ ...args, user_id: user.id });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err),
          };
        }
      },
    ),
  },
};
