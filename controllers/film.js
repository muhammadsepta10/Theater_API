const model = require("../models");
const film = model.film;
const genre = model.genre;

exports.input = (req, res) => {
  film
    .create({
      name: req.body.name,
      id_genre: req.body.genre,
      synopsis: req.body.synopsis,
      price: req.body.price,
      image: req.body.image,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(input => res.json(input))
    .catch(err => res.send(err));
};

exports.byId = (req, res) => {
  film
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(byId => res.send(byId))
    .catch(err => res.send(err));
};

exports.index = (req, res) => {
  film
    .findAll({
      include: [
        {
          model: genre,
          as: "Genre"
        }
      ],
      order: [["id", "desc"]]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  film
    .update(
      {
        name: req.body.name,
        synopsis: req.body.synopsis,
        price: req.body.price,
        image: req.body.image,
        updatedAt: new Date()
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

exports.delete = (req, res) => {
  film
    .destroy({
      where: { id: req.params.id }
    })
    .then(res.send("delete success"))
    .catch(err => res.send(err));
};
