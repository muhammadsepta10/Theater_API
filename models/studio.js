"use strict";
module.exports = (sequelize, DataTypes) => {
  const studio = sequelize.define(
    "studio",
    {
      name: DataTypes.STRING,
      id_cinema: DataTypes.INTEGER
    },
    {}
  );
  studio.associate = function(models) {
    // associations can be defined here
    studio.belongsTo(models.cinema, {
      foreignKey: "id_cinema",
      as: "Cinema"
    });
    studio.hasMany(models.seat, {
      foreignKey: "id_studio"
    });
    studio.hasMany(models.schedule, {
      foreignKey: "id_schedule"
    });
  };
  return studio;
};
