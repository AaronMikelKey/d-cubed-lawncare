const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Schedule extends Model {}

// create fields/columns for Schedule model
Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   appointment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "appointments",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "schedule",
  }
);

module.exports = Schedule;
