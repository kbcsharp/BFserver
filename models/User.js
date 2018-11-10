module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
        // validate: {unique: true}
      },
      username: {
        type: DataTypes.STRING,
        unique: "uniqueuser"
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      }
    },
    { indexes: [{ unique: true, fields: ["email"] }] }
  );
};
