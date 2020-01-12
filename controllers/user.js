const model = require("./../models");
const user = model.user;

exports.show = (req, res) => {
  user
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};

exports.delete = (req, res) => {
  user
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(res.send("delete success"))
    .catch(err => res.send(err));
};

exports.index = (req, res) => {
  user
    .findAll({})
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  user
    .update(
      {
        name: req.body.name
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
