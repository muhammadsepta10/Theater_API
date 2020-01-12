const model = require("./../models");
const seat = model.seat;
const payment = model.payment;
const studio = model.studio;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.by_studio = (req, res) => {
  seat
    .findAll({
      where: {
        id_studio: req.params.id
      },
      attributes: ["id", "number_seat", "id_studio"]
    })
    .then(studio => res.send(studio))
    .catch(err => res.send(err));
};

exports.seatIndex = (req, res) => {
  payment
    .findAll({
      where: {
        id_schedule: req.params.id
      }
    })
    .then(paymentSeat => {
      if (
        paymentSeat &&
        paymentSeat.constructor === Array &&
        paymentSeat.length === 0
      ) {
        res.send([]);
      } else {
        for (let i = 0; i < paymentSeat.length; i++) {
          seat
            .findAll({
              where: {
                id_studio: req.params.id_studio,
                id: paymentSeat[i].id_seat
              },
              include: [
                {
                  model: studio,
                  as: "Studio"
                }
              ]
            })
            .then(paymentSeat => res.send(paymentSeat))
            .catch(err => res.send(err));
        }
      }
    })
    .catch(err => res.send(err));
};

exports.countChairs = (req, res) => {
  seat
    .findAndCountAll({})
    .then(count => res.send(count))
    .catch(err => res.send(err));
};

exports.create = (req, res) => {
  seat
    .create({
      number_seat: req.body.number_seat,
      id_studio: req.body.id_studio,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(create => res.json(create))
    .catch(err => res.send(err));
};

exports.delete = (req, res) => {
  seat
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(res.send("delete success"))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  seat
    .update(
      {
        number_seat: req.body.number_seat,
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
