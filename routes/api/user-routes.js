const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

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
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST login route
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
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
        res.json({ error: err });
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
