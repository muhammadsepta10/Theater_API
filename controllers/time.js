const model = require("../models");
const time = model.time;

exports.index = (req, res) => {
  time
    .findAll({})
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.show = (req, res) => {
  time
    .findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: model.schedule,
          attributes: [`id`, `id_film`, `dateStart`, `dateEnd`, `id_studio`],
          as: "Schedule",
          include: [
            {
              model: model.film,
              as: "Film"
            },
            {
              model: model.studio,
              as: "Studio",
              include: [
                {
                  model: model.cinema,
                  as: "Cinema"
                }
              ]
            }
          ]
        }
      ]
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};

exports.byStudio = (req, res) => {
  model.schedule
    .findAll({
      attributes: [`id`, "id_studio", "id_film"],
      where: {
        id_studio: req.params.id,
        id_film: req.params.id_film
      }
    })
    .then(index => {
      if (index) {
        for (let i = 0; i < index.length; i++) {
          time
            .findAll({
              where: {
                id_schedule: index[i].id
              },
              include: [
                {
                  model: model.schedule,
                  attributes: [
                    `id`,
                    `id_film`,
                    `dateStart`,
                    `dateEnd`,
                    `id_studio`
                  ],
                  as: "Schedule",
                  include: [
                    {
                      model: model.film,
                      as: "Film"
                    },
                    {
                      model: model.studio,
                      as: "Studio",
                      include: [
                        {
                          model: model.cinema,
                          as: "Cinema"
                        }
                      ]
                    }
                  ]
                }
              ]
            })
            .then(studio => res.send(studio))
            .catch(err => res.send(err));
        }
      } else {
        res.send("data not found");
      }
    })
    .catch(err => res.send(err));
};
