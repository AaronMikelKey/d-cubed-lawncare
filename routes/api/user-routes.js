const router = require("express").Router();
const { User, Schedule } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT auth function
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: err });
    req.username = user;

    next();
  });
};

// JWT generate function

const generateToken = (username) => {
  console.log("username: ", username);
  console.log(
    jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: 1800,
    })
  );

  return jwt.sign(username, process.env.JWT_SECRET, {
    expiresIn: 1800,
  });
};

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
    password: bcrypt.hash(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    stAddress: req.body.stAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
  })
    .then(() => {
      const token = generateToken(req.body.username);
      res.json(token);
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
      //verify user
      const password = req.body.password;
      console.log(password);
      const validPassword = dbUserData.checkPassword(password);

      if (!dbUserData || !validPassword) {
        return res.json({
          error:
            "Username or password incorrect. Please try again or create an account.",
        });
      } else {
        console.log(generateToken(dbUserData.username));
        const token = generateToken(dbUserData.username);

        res.json(token);
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: err });
    });
});

router.post("/dashboard", authenticateToken, async (req, res) => {
  const scheduleData = await Schedule.findAll();
  const userData = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  res
    .json({ admin: userData.admin, data: { schedule: scheduleData } })
    .catch((err) => res.json({ error: err }));
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
