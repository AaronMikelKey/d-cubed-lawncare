const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { Cookie } = require("express-session");

//Session secrets for cookie
const cookieVars = {
  secret: "dev secret", //change to env on deployment
  secure: false, //change to true on deployment, doesn't work unless it's on https website if true
  sameSite: true,
  maxAge: 7200000, // 2 hours
};

//session variable
let sess = { username: "", password: "", cookie: "" };

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST signup route
router.post("/signup", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    stAddress: req.body.stAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phoneNumber: req.body.phoneNumber
  })
    .then((dbUserData) => {
      console.log(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST login route
router.post("/login", (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
<<<<<<< HEAD
      //verify user
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!dbUserData || !validPassword) {
        res.json({
          message:
            "Username or password incorrect. Please try again or create an account.",
        });
        return;
      } else {
        const username = req.body.username;
        const password = bcrypt.hashSync(req.body.password, 10);

        console.log(req.session);
        if (!req.session) {
          /*
          let newCookie = new Cookie();
          newCookie.name = 'rememberMe' //value: JSON.stringify(sess),secret : cookieVars.secret, secure: cookieVars.secure, maxAge: cookieVars.maxAge)
          newCookie.value = JSON.stringify(sess);

          req.session.cookie = newCookie */

          req.session.regenerate((err) => {
            if (err) {
              console.log(err);
            }
            req.session.username = username;
            req.session.password = password;
            req.session.save((err) => {
              if (err) {
                console.log(err);
              }
              res.redirect("/");
            });
          });
        }

        res.redirect("/");
=======
      if (dbUserData !== null) {
        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!dbUserData || !validPassword) {
          res.json({
            message:
              "Username or password incorrect. Please try again or create an account.",
          });
          return;
        }

        res.json({ user: dbUserData, message: "You are now logged in." });
      } else {
        res.redirect("/login");
>>>>>>> main
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {});

module.exports = router;
