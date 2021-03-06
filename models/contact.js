export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email',
        },
      },
    },
  });

  return Contact;
};
