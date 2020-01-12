"use strict";
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      role: DataTypes.STRING
    },
    {}
  );
  role.associate = function(models) {
    // associations can be defined here
    role.hasMany(models.user, {
      foreignKey: "id_role",
      as: "Role"
    });
  };
  return role;
};
