"use strict";
module.exports = (sequelize, DataTypes) => {
  const cinema = sequelize.define(
    "cinema",
    {
      name: DataTypes.STRING,
      addres: DataTypes.STRING,
      telp: DataTypes.STRING
    },
    {}
  );
  cinema.associate = function(models) {
    // associations can be defined here
    cinema.hasMany(models.studio, {
      foreignKey: "id_cinema",
      as: "Cinema"
    });
  };
  return cinema;
};
