const dbConfig = require('../dbconfig/database.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD || '', {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //  logging:false,
    // operatorsAliases: false,
    timezone: '+05:00', //Set timeZone for PKT
});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.js')(sequelize, DataTypes);
db.profile = require('./Profile.js')(sequelize, DataTypes);
db.Package = require('./Package.js')(sequelize, DataTypes);
db.BookCourse = require('./BookCourse.js')(sequelize, DataTypes);

// db.chatSystem = chatSystem;
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sequelize synchronized with database.");
    })
    .catch(err => {
        console.error("Error syncing Sequelize with database:", err);
    });

// db.sequelize.sync({ alter: true })
// .then(() => {
//     console.log("Sequelize synchronized with AWS database.");
// })
// .catch(err => {
//     console.error("Error syncing Sequelize with AWS database:", err);
// });


module.exports = db;