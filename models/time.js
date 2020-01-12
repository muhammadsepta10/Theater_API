"use strict";
module.exports = (sequelize, DataTypes) => {
  const time = sequelize.define(
    "time",
    {
      timeStart: DataTypes.TIME,
      timeEnd: DataTypes.TIME,
      id_schedule: DataTypes.INTEGER
    },
    {}
  );
  time.associate = function(models) {
    // associations can be defined here
    time.belongsTo(models.schedule, {
      foreignKey: "id_schedule",
      as: "Schedule"
    });
  };
  return time;
};
