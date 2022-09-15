const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  console.log(req.session);
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

const getUser = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response.json();
};

router.get("/dashboard", async (req, res) => {
  getUser("https://d-cubed.herokuapp.com/api/dashboard", {
    username: req.session.username,
  }).then((data) => {
    console.log(data);
    return res.render("dashboard", data);
  });
});

module.exports = router;
