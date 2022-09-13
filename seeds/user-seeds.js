const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "clbobbitt",
    email: "chaz@gmail.com",
    password: "$2b$10$oYuOfNDs9n4cMTScWH/rwutIdnbu7E.1EzK2AUA9SoI/djGlYoX/u",
    admin: true,
    firstName: "Chaz",
    lastName: "Bobbitt",
    stadd: "125 Any Street",
    city: "Anywhere",
    state: "NC",
    zip: 27284,
    phone: 5555555555,
  },
  {
    username: "rkharris",
    email: "regettaspearman@gmail.com",
    password: "$2b$10$oYuOfNDs9n4cMTScWH/rwutIdnbu7E.1EzK2AUA9SoI/djGlYoX/u",
    admin: false,
    firstName: "RK",
    lastName: "Harris",
    stAddress: "123 Any Street",
    city: "Anywhere",
    state: "NC",
    zip: 27284,
    phone: 5555558077,
  },
  {
    username: "swbobbitt",
    email: "swrichar4@gmail.com",
    password: "$2b$10$oYuOfNDs9n4cMTScWH/rwutIdnbu7E.1EzK2AUA9SoI/djGlYoX/u",
    admin: false,
    firstName: "Sherica",
    lastName: "Bobbitt",
    stadd: "125 Any Street",
    city: "Anywhere",
    state: "NC",
    zip: 27284,
    phone: 5555555555,
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
