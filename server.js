const path = require("path");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const bcrypt = require("bcrypt");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const indexRouter = require("./routes/index");
const userRouter = require("./routes/api/user-routes");

const app = express();

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
