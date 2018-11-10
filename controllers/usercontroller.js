var express = require("express");
var router = express.Router();
var sequelize = require("../db");

var User = sequelize.import("../models/User");
var Item = sequelize.import("../models/Item");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//create new user
router.post("/signup", function(req, res) {
  var username = req.body.user.username;
  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var pass = req.body.user.password;
  var role = "user";

  User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: bcrypt.hashSync(pass, 10),
    role: role
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

//login for user
router.post("/login", function(req, res) {
  User.findOne({ where: { email: req.body.user.email } }).then(
    user => {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                user: user,
                message: "successfully authenticated",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "bad gateway" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    err => res.status(501).send({ error: "failed to process" })
  );
});

// edit username for user
router.put("/:id/update", (req, res) => {
  if (!req.errors) {
    User.update(req.body.user, { where: { id: req.params.id } })
      .then(user => res.status(200).json(user))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// delete username for user
router.delete("/:id/delete", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
});

//create admin account

router.post("/signup/admin", function(req, res) {
  var username = req.body.user.username;
  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var pass = req.body.user.password;
  var role = "admin";

  User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: bcrypt.hashSync(pass, 10),
    role: role
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.status(500).send(err.message);
    }
  );
});

// /login for admin
router.post("/login/admin", function(req, res) {
  User.findOne({ where: { email: req.body.user.email } }).then(
    user => {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                user: user,
                message: "successfully authenticated",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "bad gateway" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    err => res.status(501).send({ error: "failed to process" })
  );
});

module.exports = router;
