const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require("nodemailer");
var fs = require('fs');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const confirmUrl = `http://localhost:3000/user/confirm/${user.id}`;
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "yohannmartinez34@gmail.com",
                  pass: "u2315125Ob2ace0"
                }
              });

              transporter.sendMail({
                to: user.email,
                subject: "Forquatec - Confirmer mon adresse email",
                html: `<div style="text-align:center">
                  
                  <p>Pour pouvoir utiliser certaines fonctionnalités de Forquatec, vous devez faire valider l'adresse e-mail de votre compte.</p><br/>
                  <a href="${confirmUrl}" style="padding:2em;background-color:#4E999B;color:white">Confirmer l'adresse mail</a><br/>
                  </div>`,

              });

              res.json(user)

            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          emailChecked: user.emailChecked,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/users/confirmMail
// @desc check if mail is wrong
// @access Public
router.post("/confirmMail", (req, res) => {
  User.findById({ _id: req.body.id }, function (err, user) {
    if (user) {
      if (user.emailChecked === "False") {
        console.log(user)
        User.updateOne({ _id: user._id }, { "emailChecked": "True" }).then((response) => {
          res.status(201).send({ response, message: "votre email à été confirmé avec succès" })
        }).catch(err => {
          res.status(201).send({ message: "quelque chose s'est mal passé, réesayer ulterieurement et si le problème persiste contactez le service client forquatec" })
        });
      } else {
        res.status(200).json({ user, message: "votre email à déjà été confirmé" })
      }

    } else if (!user) {
      res.status(200).json({ message: "Le lien n'est plus/pas valide" })
    } else {
      res.status(200).json({ message: "quelque chose s'est mal passé, réesayer ulterieurement et si le problème persiste contactez le service client forquatec" })
    }
  });
});

// @route GET api/users/CurrentUserInfos
// @desc check if mail is wrong
// @access Public
router.get("/CurrentUserInfos", (req, res) => {
  console.log(req.query)
  User.findById({ _id: req.query.id }, function (err, user) {
    if (user) {
      res.status(200).json({ message: "success", user: user })
    } else {
      res.status(400).json({ message: "quelque chose s'est mal passé, réesayer ulterieurement et si le problème persiste contactez le service client forquatec" })
    }
  });
});

// @route POST api/users/updateInformations
// @desc update the user infos, not including the password
// @access Public
router.post("/updateInformations", (req, res) => {
  console.log(req.body)
  User.updateOne({ _id: req.body.id }, { "name": req.body.name, "email": req.body.email })
    .then(res => res.status(200).json({ message: "user updated", response }))
    .catch(err => res.status(200).json({ message: "user not updated", err }))
});

// @route POST api/users/updateInformations
// @desc update the user infos, not including the password
// @access Public
router.post("/updatePassword", (req, res) => {
  console.log(req.body)
  User.findOne({ _id: req.body.id }).then(user => {
    bcrypt.compare(req.body.oldPassword, user.password).then(isMatch => {
      console.log("this worked", isMatch)
      if (isMatch) {
        console.log("this worked", isMatch)
        bcrypt.genSalt(10, (err, salt) => {
          console.log("this worked", salt)
          if (err) throw err;
          bcrypt.hash(req.body.newPassword, salt, ((err, hashedPassword) => {
            console.log("this workedd", hashedPassword, req.body.id)
            if (err) throw err;
            User.updateOne({ _id: req.body.id }, { "password": hashedPassword })
              .then(response => res.status(200).json({ message: "user updated", success: true, response }))
              .catch(error => res.status(200).json({ message: "userNotUpdated", success: false, response }))
          }))
        })
      } else {
        res.status(200).json({ message: "oldPasswordInvalid", success: false })
      }
    })
  })
  // .then(res=> res.status(200).json({message:"user updated", response}))
  // .catch(err => res.status(200).json({message:"user not updated", err}))
});

module.exports = router;
