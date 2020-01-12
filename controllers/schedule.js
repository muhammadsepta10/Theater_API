const model = require("./../models");
const schedule = model.schedule;
const film = model.film;
const time = model.time;
const { Op } = require("sequelize");

exports.index = (req, res) => {
  schedule
    .findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "id_film", `dateStart`, `dateEnd`, `id_studio`],
      include: [
        {
          model: model.film,
          as: "Film",
          include: [
            {
              model: model.genre,
              as: "Genre"
            }
          ]
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
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.indexRelease = (req, res) => {
  schedule
    .findAll({
      attributes: [
        `id`,
        `id_film`,
        `dateStart`,
        `dateEnd`,
        `id_studio`,
        `createdAt`,
        `updatedAt`
      ],
      where: {
        dateStart: {
          [Op.lte]: Date.now()
        },
        dateEnd: {
          [Op.gte]: Date.now()
        }
      },
      include: [
        {
          model: film,
          as: "Film"
        }
      ],
      order: [["dateStart", "ASC"]]
    })
    .then(indexRealease => res.send(indexRealease))
    .catch(err => res.send(err));
};

exports.indexComingSoon = (req, res) => {
  schedule
    .findAll({
      attributes: [
        `id`,
        `id_film`,
        `dateStart`,
        `dateEnd`,
        `id_studio`,
        `createdAt`,
        `updatedAt`
      ],
      where: {
        dateStart: {
          [Op.gte]: Date.now()
        }
      },
      include: [
        {
          model: film,
          as: "Film"
        }
      ],
      order: [["dateStart", "ASC"]],
      limit: 10
    })
    .then(indexComingSoon => res.send(indexComingSoon))
    .catch(err => res.send(err));
};

exports.filmSchedule = (req, res) => {
  schedule
    .findAll({
      attributes: [
        `id`,
        `id_film`,
        `dateStart`,
        `dateEnd`,
        `id_studio`,
        `createdAt`,
        `updatedAt`
      ],
      where: {
        id_film: req.params.id
      },
      include: [
        {
          model: model.film,
          as: "Film",
          include: [
            {
              model: model.genre,
              as: "Genre"
            }
          ]
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
    })
    .then(filmSchedule => res.send(filmSchedule))
    .catch(err => res.send(err));
};

exports.indexByStudio = (req, res) => {
  schedule
    .findAll({
      attributes: [`id`, `id_film`, `dateStart`, `dateEnd`, `id_studio`],
      where: {
        id_studio: req.params.id,
        id_film: req.params.id_film
      },
      include: [
        {
          model: model.film,
          as: "Film",
          include: [
            {
              model: model.genre,
              as: "Genre"
            }
          ]
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
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.create = (req, res) => {
  schedule
    .findOne({
      attributes: [`id`, `id_film`, `dateStart`, `dateEnd`, `id_studio`],
      where: {
        dateEnd: {
          [Op.lt]: Date.now(),
          id_film: req.body.id_film,
          id_studio: req.body.id_studio
        }
      }
    })
    .then(find => {
      if (find) {
        res.send("date , film , and studio has been used");
      } else {
        schedule
          .create({
            id_film: req.body.id_film,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            id_studio: req.body.id_studio
          })
          .then(success => {
            time
              .findOne({
                where: {
                  timeStart: {
                    [Op.between]: [req.body.timeStart, req.body.timeEnd]
                  },
                  id_schedule: success.id
                }
              })
              .then(find => {
                if (find) {
                  res.send("time has been used");
                } else {
                  schedule
                    .findAll({
                      attributes: [`id`],
                      limit: 1,
                      order: [["id", "DESC"]]
                    })
                    .then(find => {
                      for (let i = 0; i < find.length; i++) {
                        time
                          .create({
                            id_schedule: find[i].id,
                            timeStart: req.body.timeStart,
                            timeEnd: req.body.timeEnd
                          })
                          .then(created => res.json(created))
                          .catch(err => res.send(err));
                      }
                    });
                }
              });
          })
          .catch(err => res.send(err));
      }
    })
    .catch(err => res.send(err));
};
