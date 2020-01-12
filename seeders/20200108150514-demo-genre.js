"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Genres",
      [
        {
          name: "action",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "adventure",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "comedy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "drama",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "epic",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "science fiction",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "horror",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "butcher",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "musical",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "war",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulDelete("Genres", null, {});
  }
};
