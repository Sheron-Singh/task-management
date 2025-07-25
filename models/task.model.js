const { DataTypes } = require('sequelize');
const sequelize = require("../config/database.js");


  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending'
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Task.associate = models => {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
  };

  module.exports= Task;


