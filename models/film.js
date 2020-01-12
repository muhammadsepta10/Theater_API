"use strict";
module.exports = (sequelize, DataTypes) => {
  const film = sequelize.define(
    "film",
    {
      name: DataTypes.STRING,
      id_genre: DataTypes.INTEGER,
      synopsis: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING
    },
    {}
  );
  film.associate = function(models) {
    film.belongsTo(models.genre, {
      foreignKey: "id_genre",
      as: "Genre"
    });

    film.hasMany(models.schedule, {
      foreignKey: "id_film"
    });
  };
  return film;
};
