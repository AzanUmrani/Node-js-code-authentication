module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        booking_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bookings',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        learner_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        review_text: {
            type: DataTypes.TEXT,
        },
        communication_rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        punctuality_rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        teaching_quality_rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        would_recommend: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_verified_review: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'reviews',
        timestamps: false,
    });

    // Review.associate = (models) => {
    //     Review.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id' });
    //     Review.belongsTo(models.User, { foreignKey: 'learner_id', targetKey: 'id' });
    //     Review.belongsTo(models.User, { foreignKey: 'instructor_id', targetKey: 'id' });
    // };

    return Review;
};
