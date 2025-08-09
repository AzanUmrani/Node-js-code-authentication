module.exports = (sequelize, DataTypes) => {
    const InstructorProfile = sequelize.define("InstructorProfile", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        experience_years: {
            type: DataTypes.INTEGER,
        },
        hourly_rate: {
            type: DataTypes.DECIMAL(10, 2),
        },
        location_area: {
            type: DataTypes.STRING,
            allowNull: false,
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
        qualifications: {
            type: DataTypes.STRING,
        },
        vehicle_type: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.DECIMAL(3, 2),
            defaultValue: 5.0,
        },
        total_reviews: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'instructor_profiles',
        timestamps: false,
    });

    // InstructorProfile.associate = (models) => {
    //     InstructorProfile.belongsTo(models.Profile, { foreignKey: 'id', targetKey: 'id' });
    // };

    return InstructorProfile;
};
