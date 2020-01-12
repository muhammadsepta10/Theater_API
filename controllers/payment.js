const model = require("./../models");
const payment = model.payment;
const film = model.film;
const seat = model.seat;
const user = model.user;
const schedule = model.schedule;

exports.create = (req, res) => {
  payment
    .create({
      id_schedule: req.body.id_schedule,
      id_seat: req.body.id_seat,
      id_user: req.body.id_user,
      id_status: 1
    })
    .then(create => res.json(create))
    .catch(err => res.send(err));
};

exports.update = (req, res) => {
  payment
    .update(
      {
        id_status: req.body.id_status
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(update => res.send(update))
    .catch(err => res.send(err));
};

exports.byUserPending = (req, res) => {
  payment
    .findAll({
      where: {
        id_user: req.params.id,
        id_status: 1
      },
      include: [
        {
          model: film,
          as: "Film"
        },
        {
          model: seat,
          as: "Seat"
        },
        {
          model: user,
          as: "Status"
        },
        {
          model: schedule,
          as: "Schedule"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.byUserConfirm = (req, res) => {
  payment
    .findAll({
      where: {
        id_user: req.params.id,
        id_status: 2
      },
      include: [
        {
          model: film,
          as: "Film"
        },
        {
          model: seat,
          as: "Seat"
        },
        {
          model: user,
          as: "Status"
        },
        {
          model: schedule,
          as: "Schedule"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.byUserApproved = (req, res) => {
  payment
    .findAll({
      where: {
        id_user: req.params.id,
        id_status: 3
      },
      include: [
        {
          model: film,
          as: "Film"
        },
        {
          model: seat,
          as: "Seat"
        },
        {
          model: user,
          as: "Status"
        },
        {
          model: schedule,
          as: "Schedule"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.status = (req, res) => {
  payment
    .findAll({
      where: {
        id_status: req.params.id
      },
      include: [
        {
          model: film,
          as: "Film"
        },
        {
          model: seat,
          as: "Seat"
        },
        {
          model: user,
          as: "Status"
        },
        {
          model: schedule,
          as: "Schedule"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};
