module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        learner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'profiles',
                key: 'id',
            },
            onDelete: 'CASCADE',
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
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
            defaultValue: 'pending',
        },
        lesson_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            defaultValue: 60,
        },
        pickup_location: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'bookings',
        timestamps: false,
    });

    // Booking.associate = (models) => {
    //     Booking.belongsTo(models.Profile, { foreignKey: 'learner_id', targetKey: 'id' });
    //     Booking.belongsTo(models.Profile, { foreignKey: 'instructor_id', targetKey: 'id' });
    // };

    return Booking;
};
