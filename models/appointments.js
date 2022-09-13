const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Appointments extends Model {}

// create fields/columns for Appointment model
Appointments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "appointments",
  }
);

module.exports = Appointments;
