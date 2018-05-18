// Import Auth and Errors Function
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';
import sequelize from 'sequelize';

export default {
  Query: {
    getAllContacts: requiresAuth.createResolver(
      async (parent, args, { models, user }) =>
        models.Contact.findAll({
          where: { user_id: user.id },
          order: ['"firstName"'],
        }),
    ),
    getContact: requiresAuth.createResolver(
      async (parent, { id }, { models, user }) =>
        models.Contact.findOne({ where: { id } }),
    ),
  },
  Mutation: {
    // Check if user has permission to add contact
    createContact: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const contact = await models.Contact.create({
            ...args,
            user_id: user.id,
          });
          return {
            ok: true,
            contact,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err, models),
          };
        }
      },
    ),
    // Check if user has permission to Edit contact
    updateContact: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const contact = await models.Contact.findOne({
            where: { id: args.id },
          });
          await contact.update({ ...args });
          return {
            ok: true,
            contact,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err, models),
          };
        }
      },
    ),

    // Check if user has permission to Delete contact
    deleteContact: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const contact = await models.Contact.findOne({
            where: { id: args.id },
          });
          await contact.destroy({ force: true });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err, models),
          };
        }
      },
    ),
  },
};
