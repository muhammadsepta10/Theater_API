const model = require("./../models");
const studio = model.studio;
const cinema = model.cinema;
const seat = model.seat;

exports.indexByCinema = (req, res) => {
  studio
    .findAll({
      where: {
        id_cinema: req.params.id
      },
      include: [
        {
          model: cinema,
          as: "Cinema"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.index = (req, res) => {
  studio
    .findAll({
      include: [
        {
          model: cinema,
          as: "Cinema"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.create = (req, res) => {
  studio
    .create({
      name: req.body.name,
      id_cinema: req.body.id_cinema,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(create => res.jsno(create))
    .catch(err => res.send(err));
};

exports.delete = (req, res) => {
  studio
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(res.send("sukses"))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  studio
    .update(
      {
        name: req.body.name,
        updatedAt: Date.now()
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(edit => res.json(edit))
    .catch(err => res.send(err));
};
