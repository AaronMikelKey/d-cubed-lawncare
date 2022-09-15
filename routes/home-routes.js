const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  // TODO: Add logic to check for logged in
  const data = {
    username: req.session.username,
    expires: req.session._expires,
  };
  console.log(req.session);
  res.render("welcome", data);
});

router.get("/login", (req, res) => {
  console.log(req.session);
  if (req.session.username) {
    res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
