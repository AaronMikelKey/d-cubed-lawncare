const User = require("../models/user");
const Reviews = require("../models/reviews");
const Schedule = require("../models/schedule");
const Appointments = require("..models/appointments");
const { hasOne } = require("../models/user");

//create associations
User.hasMany(Appointments, {
  foreignKey: "user_id",
});

Appointments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Schedule, {
  foreignKey: "user_id",
});

Schedule.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Reviews.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Reviews.belongsTo(Appointments, {
  foreignKey: "appointment_id",
  onDelete: "SET NULL",
});

User.hasMany(Reviews, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Appointments.hasMany(Reviews, {
  foreignKey: "appointment_id",
});

Appointments.belongsTo(Schedule, {
  foreignKey: "schedule_id",
  onDelete: "SET NULL",
});

Schedule.hasOne(Appointments, {
  foreignKey: "appointment_id",
});

module.exports = { User, Reviews, Schedule, Appointments };
