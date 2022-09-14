const { Schedule } = require("../models");

const scheduledata = [
  {
    date: "2022-09-12",
    time: "2 PM",
    appointment_id: 1,
    service_scheduled: "lawn cutting"
  },
  {
    date: "2022-09-12",
    time: "3:30 PM",
  },
  {
    date: "2022-09-12",
    time: "5 PM",
    appointment_id: 2,
    service_scheduled: "leaf blowing"
  },
  {
    date: "2022-09-13",
    time: "2 PM",
    appointment_id: 3,
    service_scheduled: "lawn cutting"
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
    appointment_id: 4,
    service_scheduled: "bush trimming"
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
    appointment_id: 5,
    service_scheduled: "seeding"
  },
  {
    date: "2022-09-16",
    time: "2 PM",
    appointment_id: 6,
    service_scheduled: "backyard lawn cutting"
  },
  {
    date: "2022-09-16",
    time: "3:30 PM",
    appointment_id: 7, 
    service_scheduled: "flower bed pruning"
  },
  {
    date: "2022-09-16",
    time: "5 PM",
    appointment_id: 8,
    service_scheduled: "mulch flower bed"
  },
  {
    date: "2022-09-17",
    time: "9 AM",
    appointment_id: 9,
    service_scheduled: "planting mailbox flowerbed"
  },
  {
    date: "2022-09-17",
    time: "10:30 AM"
  },
  {
    date: "2022-09-17",
    time: "12:30 PM"
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
