module.exports = (sequelize, DataTypes) => {
    const SkillProgress = sequelize.define('SkillProgress', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        learner_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        booking_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bookings',
                key: 'id',
            },
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        skill_category: {
            type: DataTypes.ENUM(
                'vehicle_controls', 'road_positioning', 'junctions', 'roundabouts', 'dual_carriageways', 
                'parking', 'reversing', 'hazard_perception'
            ),
            allowNull: false,
        },
        proficiency_level: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 5,
            },
        },
        last_practiced: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        notes: {
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
        tableName: 'skill_progress',
        timestamps: false,
    });

    // SkillProgress.associate = (models) => {
    //     SkillProgress.belongsTo(models.User, { foreignKey: 'learner_id', targetKey: 'id' });
    //     SkillProgress.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id' });
    // };

    return SkillProgress;
};
