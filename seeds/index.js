const seedUsers = require('./user-seeds');
const seedSchedule = require('./schedule-seeds');
const seedAppointments = require('./appointment-seeds');
const seedReviews = require('./reviews-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');

  await seedUsers();
  console.log('--------------');

  await seedSchedule();
  console.log('--------------');

  await seedAppointments();
  console.log('--------------');

  await seedReviews();
  console.log('--------------');

  process.exit(0);
};

seedAll();
