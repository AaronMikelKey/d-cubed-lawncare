const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create our User model
class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least eight characters long
        len: [8]
      },
    },
    // define a user type column
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: "FALSE",
      allowNull: false
    },
    //define a first name column
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a last name column
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a street address column
    stAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a city column
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define a state column
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the state abbreviation must be one of the following
        isIn: [['AL','AK','AZ','AR','AS','CA','CO','CT','DE','DC','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','CM','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','TT','UT','VT','VA','VI','WA','WV','WI','WY']],
      },
    },
    //define a zip code column
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        //makes sure the entry is numeric
        isNumeric: true, 
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        //makes sure the entry is numeric
        isNumeric: true, 
      }
    }
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
