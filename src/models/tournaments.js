const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Tournament', {

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

    total_participants: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    start_date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    all_participants: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    winner_prize: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country_of_location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cover_image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subscription_price: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },
  {
    paranoid: true
  })
};