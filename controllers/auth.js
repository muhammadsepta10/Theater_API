const jwt = require("jsonwebtoken");
const models = require("../models");
const user = models.user;
const hash = require("password-hash");

exports.login = (req, res) => {
  user
    .findOne({
      where: {
        email: req.body.email
        // password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        const password = user.password;
        const verify = hash.verify(req.body.password, password);
        if (verify === true) {
          const token = jwt.sign({ userId: user.id }, "secret code");
          const message = "sukses";
          res
            .send({
              user,
              token,
              message
            })
            .catch(err => res.send(err));
        } else {
          res.send({
            error: true,
            message: "wrong password"
          });
        }
      } else {
        res.send({
          error: true,
          message: "your email not registered"
        });
      }
    })
    .catch(err => res.send(err));
};

exports.register = (req, res) => {
  user
    .findOne({
      where: { email: req.body.email }
    })
    .then(user => {
      if (user) {
        res
          .send({
            error: true,
            message: "email telah terdaftar"
          })
          .catch(err => res.send(err));
      } else {
        models.user
          .create({
            name: req.body.name,
            email: req.body.email,
            id_role: 2,
            password: hash.generate(req.body.password),
            createdAt: Date.now(),
            updatedAt: Date.now()
          })
          .then(register => res.json(register))
          .catch(err => res.send(err));
      }
    })
    .catch(err => res.send(err));
};
