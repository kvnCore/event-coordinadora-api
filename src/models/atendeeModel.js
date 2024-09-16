
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('attendee', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
});

module.exports = Event;
