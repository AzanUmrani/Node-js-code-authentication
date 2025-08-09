module.exports = (sequelize, DataTypes) => {
    const LessonSession = sequelize.define('LessonSession', {
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
        session_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        scheduled_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            defaultValue: 60,
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled'),
            defaultValue: 'scheduled',
        },
        completion_notes: {
            type: DataTypes.TEXT,
        },
        skills_practiced: {
           type: DataTypes.TEXT,
        },
        progress_rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        instructor_feedback: {
            type: DataTypes.TEXT,
        },
        learner_feedback: {
            type: DataTypes.TEXT,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'lesson_sessions',
        timestamps: false,
    });

    // LessonSession.associate = (models) => {
    //     LessonSession.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id' });
    // };

    return LessonSession;
};
