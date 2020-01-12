const model = require("./../models");
const genre = model.genre;

exports.index = (req, res) => {
  genre
    .findAll({
      attributes: ["id", "name"]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.show = (req, res) => {
  genre
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(show => res.send(shw))
    .catch(err => res.send(err));
};

exports.create = (req, res) => {
  genre
    .create({
      name: req.body.name,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(create => res.json(create))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  genre
    .update(
      {
        name: req.body.name,
        updatedAt: new Date()
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(edit => res.send(edit))
    .catch(err => res.send(err));
};

exports.delete = (req, res) => {
  genre
    .delete({
      where: {
        id: req.params.id
      }
    })
    .then(res.send("delete success"))
    .catch(err => res.send(err));
};
