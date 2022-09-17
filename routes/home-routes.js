const router = require("express").Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  console.log(req.cookies);
  const data = {
    username: req.session.username,
    expires: req.session._expires,
  };
  res.render("welcome", data);
});

router.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  }
  res.render("login");
});

router.post("/login", async (req, res) => {
  const token = await fetch("https://d-cubed.herokuapp.com/api/login", {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: req.body.username,
      password: bcrypt.hash(req.body.password, 10),
    }),
  });
  res.cookie("jwtAuth", token, {
    expires: new Date(Date.now() + 3600000),
    secure: false,
  });
  res.redirect("/");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

const getUser = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: data,
  });
  console.log(response);
  return response;
};

router.get("/dashboard", async (req, res) => {
  const username = req.session.username;
  getUser("https://d-cubed.herokuapp.com/api/dashboard", {
    username: username,
  }).then((data) => {
    JSON.stringify(data);
    res.render("dashboard", data);
  });
});

module.exports = router;
