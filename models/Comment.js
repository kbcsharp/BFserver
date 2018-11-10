module.exports = function(sequelize, DataTypes) {
  return sequelize.define("comment", {
    content: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    }
  });
};
