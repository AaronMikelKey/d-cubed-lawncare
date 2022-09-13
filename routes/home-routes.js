const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  // TODO: Add logic to check for logged in
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("login");
});

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

router.post("/login", async (req, res) => {
  const url = "https://d-cubed.herokuapp.com/api/login"; //change to heroku url for deployment
  const data = req.body;
  postData(url, data).then((data) => {
    console.log(data);
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
