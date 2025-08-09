module.exports = (sequelize, DataTypes) => {
    const InstructorBadge = sequelize.define('InstructorBadge', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        badge_type: {
            type: DataTypes.ENUM('verified_instructor', 'top_rated', 'experienced_instructor', 'high_pass_rate', 'excellent_communication'),
            allowNull: false,
        },
        awarded_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        expires_at: {
            type: DataTypes.DATE,
        },
        awarded_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        badge_criteria: {
            type: DataTypes.TEXT,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'instructor_badges',
        timestamps: false,
    });

    return InstructorBadge;
};
