"use strict";
module.exports = (sequelize, DataTypes) => {
  const seat = sequelize.define(
    "seat",
    {
      number_seat: DataTypes.STRING,
      id_studio: DataTypes.INTEGER
    },
    {}
  );
  seat.associate = function(models) {
    // associations can be defined here
    seat.belongsTo(models.studio, {
      foreignKey: "id_studio",
      as: "Studio"
    });
    seat.hasMany(models.payment, {
      foreignKey: "id_seat"
    });
  };
  return seat;
};
