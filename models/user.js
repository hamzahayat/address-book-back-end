import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 18],
            msg: 'The password needs to be between 5 and 18 characters long',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        },
      },
    },
  );

  User.associate = models => {
    User.hasMany(models.Contact, { as: 'Contacts' });
  };

  return User;
};
