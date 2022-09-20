const router = require("express").Router();
const { User, Schedule } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT auth function
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtAuth;

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: err });
    req.username = user;

    next();
  });
};

// JWT generate function

const generateToken = (username, id, admin) => {
  return jwt.sign(
    { username: username, userId: id, admin: admin },
    process.env.JWT_SECRET
  );
};

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
  const data = async () => {
    const password = req.body.password;
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    return { password, dbUserData };
  };
  data()
    .then((response) => {
      //verify user
      const validPassword = response.dbUserData.checkPassword(
        response.password
      );
      // No user or invalid PW
      if (!response.dbUserData || !validPassword) {
        return res.json({
          error:
            "Username or password incorrect. Please try again or create an account.",
        });
      } else {
        const token = generateToken(
          response.dbUserData.username,
          response.dbUserData.id,
          response.dbUserData.admin
        );

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
  console.log(scheduleData);
  res
    .json({ admin: userData.admin, data: { schedule: scheduleData } })
    .catch((err) => res.json({ error: err }));
});

// GET signout
router.get("/signout", (req, res) => {
  res.cookie(
    "jwtAuth",
    { data: null },
    {
      expires: new Date(Date.now()),
      secure: false,
    }
  );
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
