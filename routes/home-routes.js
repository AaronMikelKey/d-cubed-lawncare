const router = require("express").Router();

router.get("/", (req, res) => {
  // TODO: Add logic to check for logged in
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
