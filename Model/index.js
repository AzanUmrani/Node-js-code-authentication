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
db.Availabilityslot = require('./AvailabilitySlot.js')(sequelize, DataTypes);
db.blogpost = require('./blogPosts.js')(sequelize , DataTypes);
db.bookings = require('./Bookings.js')(sequelize, DataTypes);
db.cityLandingPage = require('./CityLandingPage.js')(sequelize, DataTypes);
db.compliance = require('./ComplianceAlert')(sequelize, DataTypes);
db.creditpackages = require('./CreditPackage.js')(sequelize, DataTypes);
db.instructorAvalability = require('./instructorAvailability.js')(sequelize, DataTypes);
db.instructorbadges = require('./InstructorBadge.js')(sequelize, DataTypes);
db.instructorprofile = require('./instructorProfiles.js')(sequelize, DataTypes);
db.instructordocuments = require('./InstructorDocument.js')(sequelize, DataTypes);
db.instructorwallet = require('./InstructorWallet.js')(sequelize, DataTypes);
db.lead = require('./Lead.js')(sequelize, DataTypes);
db.leadtranscation = require('./LeadTransaction.js')(sequelize, DataTypes);
db.learnerprofile = require('./learnerProfiles.js')(sequelize, DataTypes);
db.lessoonpackage = require('./LessonPackage.js')(sequelize, DataTypes);
db.lessonsession = require('./LessonSession.js')(sequelize, DataTypes);
db.message = require('./Message.js')(sequelize, DataTypes);
db.apges = require('./Pages.js')(sequelize, DataTypes);
db.paymentrequest = require('./PaymentRequest.js')(sequelize, DataTypes);
db.postcodesrate = require('./PostCodeRate.js')(sequelize, DataTypes);
db.profile = require('./Profile.js')(sequelize, DataTypes);
db.review = require('./Review.js')(sequelize, DataTypes);
db.skillprogress = require('./SkillProgress.js')(sequelize, DataTypes);
db.slideshomeimage = require('./SlideshowImage.js')(sequelize, DataTypes);
db.subscriptionplans = require('./subscription_plans.js')(sequelize, DataTypes);
db.supporttickets = require('./SupportTicket.js')(sequelize, DataTypes);
db.wallettranscation = require('./WalletTransaction.js')(sequelize, DataTypes);
db.Availabilityslot.belongsTo(db.user, { foreignKey: 'instructor_id' });
db.user.hasMany(db.Availabilityslot, { foreignKey: 'instructor_id' });


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