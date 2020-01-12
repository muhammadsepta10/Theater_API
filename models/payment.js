"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      id_schedule: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      id_seat: DataTypes.INTEGER,
      id_status: DataTypes.INTEGER
    },
    {}
  );
  payment.associate = function(models) {
    // associations can be defined here
    payment.belongsTo(models.schedule, {
      foreignKey: "id_schedule",
      as: "Schedule"
    });
    payment.belongsTo(models.user, {
      foreignKey: "id_user",
      as: "User"
    });
    payment.belongsTo(models.seat, {
      foreignKey: "id_seat",
      as: "Seat"
    });
    payment.belongsTo(models.status, {
      foreignKey: "id_status",
      as: "Status"
    });
  };
  return payment;
};
