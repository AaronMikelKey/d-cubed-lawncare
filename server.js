const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bcrypt = require("bcrypt");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const indexRouter = require("./routes/index");
const userRouter = require("./routes/api/user-routes");

const app = express();

<<<<<<< Updated upstream
=======
//Session secrets
const sessionVars = {
  secret: "dev secret", //change to env on deployment
  cookie: {
    secure: false, //change to true on deployment, doesn't work unless it's on https website if true
    sameSite: true,
    maxAge: 7200000, // 2 hours
  },
};

>>>>>>> Stashed changes
//view engine setup
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

//place all app.use() statements
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", userRouter);

module.exports = app;
