const User = require("../User");
const Reviews = require("../Reviews");
const Schedule = require("../Schedule");
const Appointments = require("../Appointments");
const { hasOne } = require("../User");

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
