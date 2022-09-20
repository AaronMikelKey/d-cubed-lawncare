const router = require("express").Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT auth function
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtAuth.data;

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: err });
    req.user = user;

    next();
  });
};

router.get("/", (req, res, next) => {
  if (!req.cookies.jwtAuth) {
    console.log("cookie error");
    return res.render("welcome");
  }

  const token = req.cookies.jwtAuth;
  const tokenDecodablePart = token.data.split(".")[1];
  const decoded = {
    data: {
      username: Buffer.from(tokenDecodablePart, "base64").toString(),
    },
  };
  const username = JSON.parse(decoded.data.username);
  res.render("welcome", { data: username });
});

router.get("/login", (req, res) => {
  if (req.cookies.jwtAuth) {
    res.redirect("/");
  }
  res.render("login");
});

router.post("/login", async (req, res) => {
  fetch("https://d-cubed.herokuapp.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Data from form inputs
      username: req.body.username,
      password: req.body.password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.cookie(
        "jwtAuth",
        { data: data },
        {
          expires: new Date(Date.now() + 3600000), //change back to 3600000
          secure: false,
        }
      );

      res.redirect("/");
      if (data.error) {
        console.log(data.error);
        return res.render("login", data.error);
      }
    });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

const getUser = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  console.log("getUserresponse: ", response);
  return response;
};

router.get("/dashboard", authenticateToken, async (req, res) => {
  const token = req.cookies.jwtAuth;
  const tokenDecodablePart = token.data.split(".")[1];
  const decoded = {
    data: {
      username: Buffer.from(tokenDecodablePart, "base64").toString(),
    },
  };
  const fetchData = { username: JSON.parse(decoded.data.username).username };
  console.log("decoded :", JSON.parse(decoded.data.username).username);
  getUser("https://d-cubed.herokuapp.com/api/dashboard", {
    fetchData,
  }).then((data) => {
    JSON.stringify(data);
    res.render("dashboard", data);
  });
});

module.exports = router;
