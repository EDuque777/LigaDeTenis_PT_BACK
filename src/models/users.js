const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('User', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    mobile_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    confirm_password: {
        type : DataTypes.STRING,
        allowNull: false
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imageprofile_picture: {
      type: DataTypes.STRING,
      allowNull: true
    },

    code_verify: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    locked: {
       type: DataTypes.BOOLEAN,
       defaultValue: false
    },

    tournament_participation: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    role: {
      type: DataTypes.ENUM("users", "admin"),
      defaultValue: "users",
    },

  },
  {
    paranoid: true
  })
};