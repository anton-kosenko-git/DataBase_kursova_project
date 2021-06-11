const Sequelize = require('sequelize');
const db = require('../config/database');

const Docs = db.define('docs', {
    title: {
        type: Sequelize.STRING
    },
    specialization: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    },

});

Docs.sync().then(() => {
    console.log('table created');
});

module.exports = Docs;