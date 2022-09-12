const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// // create our Appointment model
// class Appointments extends Model {
//   static upvote(body, models) {
//     return models.Vote.create({
//       user_id: body.user_id,
//       post_id: body.post_id
//     }).then(() => {
//       return Post.findOne({
//         where: {
//           id: body.post_id
//         },
//         attributes: [
//           'id',
//           'post_url',
//           'title',
//           'created_at',
//           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//         ],
//         include: [
//           {
//             model: models.Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//               model: models.User,
//               attributes: ['username']
//             }
//           }
//         ]
//       });
//     });
//   }
// }

class Schedule extends Model {}

// create fields/columns for Appointment model
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
    appointment_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "appointment",
        key: "user_id",
      },
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "appointments",
        key: "id",
      },
    },
    service_scheduled: {
      type: DataTypes.STRING,
      references: {
        model: "appointments",
        key: "service",
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
