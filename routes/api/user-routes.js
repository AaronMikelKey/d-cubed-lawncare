const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { Cookie } = require("express-session");

/*
const sequelize = require("../config/connection");
const seedAll = require("../seeds/index");
// Attempt to connect to db, console error if it can't
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}*/

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
    phone: req.body.phone,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST login route
router.post("/login", (req, res, next) => {
  console.log("api req", req.body);
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      //verify user
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!dbUserData || !validPassword) {
        res.render("login", {
          error:
            "Username or password incorrect. Please try again or create an account.",
        });
        return;
      } else {
        const username = req.body.username;
        const password = bcrypt.hashSync(req.body.password, 10);

        req.session.username = username;
        req.session.password = password;
        req.session.regenerate((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
});

router.post("/dashboard", (req, res) => {
  let data = {};
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      console.log("dbUserData", dbUserData);
      (data.username = dbUserData.username), (data.admin = dbUserData.admin);
    })
    .then(() => {
      res.json(data);
    });
});

// GET signout
router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
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
      res.json(dbUserData.username);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {});

module.exports = router;
