const { Appointments } = require("../models");

const appointmentdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    service: "lawn cutting",
    user_id: 2,
    schedule_id: 1,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    service: "leaf blowing",
    user_id: 3,
    schedule_id: 3,
  },
  {
    title:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    service: "lawn cutting",
    user_id: 3,
    schedule_id: 4,
  },
  {
    title: "Nunc purus.",
    service: "bush trimming",
    user_id: 2,
    schedule_id: 8,
  },
  {
    title: "Pellentesque eget nunc.",
    service: "seeding",
    user_id: 2,
    schedule_id: 12,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    service: "backyard lawn cutting",
    user_id: 3,
    schedule_id: 13,
  },
  {
    title: "In hac habitasse platea dictumst.",
    service: "flower bed pruning",
    user_id: 3,
    schedule_id: 14,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    service: "mulch flower bed",
    user_id: 3,
    schedule_id: 15,
  },
  {
    title: "Duis ac nibh.",
    service: "planting mailbox flowerbed",
    user_id: 2,
    schedule_id: 16,
  },
];

const seedAppointments = () => Appointments.bulkCreate(appointmentdata);

module.exports = seedAppointments;
