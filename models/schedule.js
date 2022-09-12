const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create fields/columns for Schedule model
Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointment_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'appointment',
        key: 'user_id'
      }
    },
    appointment_id: {
        type: DataTypes.INTEGER,
      references: {
        model: 'appointments',
        key: 'id'
      }
    },
    service_scheduled: {
        type: DataTypes.String,
        references: {
            model: 'appointments',
            key: 'service'
        }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'schedule'
  }
);

module.exports = Schedule;