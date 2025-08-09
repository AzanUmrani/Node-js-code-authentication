module.exports = (sequelize, DataTypes) => {
    const LearnerProfile = sequelize.define("LearnerProfile", {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        experience_level: {
            type: DataTypes.ENUM('beginner', 'intermediate', 'test_ready'),
        },
        preferred_location: {
            type: DataTypes.STRING,
        },
        postcode: {
            type: DataTypes.STRING,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
        },
    }, {
        tableName: 'learner_profiles',
        timestamps: false,
    });

    // LearnerProfile.associate = (models) => {
    //     LearnerProfile.belongsTo(models.Profile, { foreignKey: 'id', targetKey: 'id' });
    // };

    return LearnerProfile;
};
