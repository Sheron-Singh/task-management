const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require("../config/database.js");
const validator = require("validator");



  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
            notEmpty: { msg: "Email is required." },
            isEmail(value) {
            }
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = models => {
    User.hasMany(models.Task, { foreignKey: 'userId' });
  };

  module.exports =  User;

