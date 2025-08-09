module.exports = (sequelize, DataTypes) => {
    const InstructorAvailability = sequelize.define("InstructorAvailability", {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'profiles',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 6,
            },
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'instructor_availability',
        timestamps: false,
    });

    // InstructorAvailability.associate = (models) => {
    //     InstructorAvailability.belongsTo(models.Profile, { foreignKey: 'instructor_id', targetKey: 'id' });
    // };

    return InstructorAvailability;
};
