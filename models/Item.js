module.exports = function(sequelize, DataTypes) {
  return sequelize.define("item", {
    title: {
      type: DataTypes.STRING
    },
    resource: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    }
  });
};
