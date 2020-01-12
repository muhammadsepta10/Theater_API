"use strict";
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define(
    "schedule",
    {
      id_film: DataTypes.INTEGER,
      dateStart: DataTypes.DATE,
      dateEnd: DataTypes.DATE,
      id_studio: DataTypes.INTEGER
    },
    {}
  );
  schedule.associate = function(models) {
    // associations can be defined here
    schedule.belongsTo(models.film, {
      foreignKey: "id_film",
      as: "Film"
    });

    schedule.hasMany(models.payment, {
      foreignKey: "id_schedule"
    });

    schedule.belongsTo(models.studio, {
      foreignKey: "id_studio",
      as: "Studio"
    });

    schedule.hasMany(models.time, {
      foreignKey: "id_schedule"
    });
  };
  return schedule;
};
