const { Schedule } = require("../models");

const scheduledata = [
  {
    date: "2022-09-12",
    time: "2 PM",
  },
  {
    date: "2022-09-12",
    time: "3:30 PM",
  },
  {
    date: "2022-09-12",
    time: "5 PM",
  },
  {
    date: "2022-09-13",
    time: "2 PM",
  },
  {
    date: "2022-09-13",
    time: "3:30 PM",
  },
  {
    date: "2022-09-13",
    time: "5 PM",
  },
  {
    date: "2022-09-14",
    time: "2 PM",
  },
  {
    date: "2022-09-14",
    time: "3:30 PM",
  },
  {
    date: "2022-09-14",
    time: "5 PM",
  },
  {
    date: "2022-09-15",
    time: "2 PM",
  },
  {
    date: "2022-09-15",
    time: "3:30 PM",
  },
  {
    date: "2022-09-15",
    time: "5 PM",
  },
  {
    date: "2022-09-16",
    time: "2 PM",
  },
  {
    date: "2022-09-16",
    time: "3:30 PM",
  },
  {
    date: "2022-09-16",
    time: "5 PM",
  },
  {
    date: "2022-09-17",
    time: "9 AM",
  },
  {
    date: "2022-09-17",
    time: "10:30 AM",
  },
  {
    date: "2022-09-17",
    time: "12:30 PM",
  },
  {
    date: "2022-09-17",
    time: "2 PM",
  },
  {
    date: "2022-09-17",
    time: "3:30 PM",
  },
  {
    date: "2022-09-17",
    time: "5 PM",
  },
];

const seedSchedules = () => Schedule.bulkCreate(scheduledata);

module.exports = seedSchedules;
