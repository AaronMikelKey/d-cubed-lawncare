const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const session = require("express-session");

//Session secrets for cookie
const sessionVars = {
  secret: "dev secret", //change to env on deployment
  cookie: {
    secure: false, //change to true on deployment, doesn't work unless it's on https website if true
    sameSite: true,
    maxAge: 7200000, // 2 hours
  },
};

//session variable
let sess;

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
  })
    .then((dbUserData) => res.json(dbUserData))
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
  }).then((dbUserData) => {
    //verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!dbUserData || !validPassword) {
      res.json({
        message:
          "Username or password incorrect. Please try again or create an account.",
      });
      return;
    }

<<<<<<< Updated upstream
    res.json({ user: dbUserData, message: "You are now logged in." });
  });
=======
        sess = req.session;
        const username = req.body.username;
        const password = req.body.password;

        sess.username = username;
        sess.password = password;

        res.redirect("/");
      } else {
        res.json({
          message:
            "Username or password incorrect. Please try again or create an account.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
>>>>>>> Stashed changes
});

// PUT /api/users/1
router.put("/:id", (req, res) => {});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {});

module.exports = router;
