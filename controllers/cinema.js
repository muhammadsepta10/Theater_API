const model = require("./../models");
const cinema = model.cinema;

exports.index = (req, res) => {
  cinema
    .findAll({})
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.input = (req, res) => {
  cinema
    .create({
      name: req.body.name,
      addres: req.body.addres,
      telp: req.body.telp
    })
    .then(input => res.json(input))
    .catch(err => res.send(err));
};

exports.delete = (req, res) => {
  cinema
    .delete({
      where: {
        id: req.params.id
      }
    })
    .then(res.send("deleted"))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  cinema
    .update(
      {
        name: req.body.name,
        addres: req.body.addres,
        telp: req.body.telp
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
