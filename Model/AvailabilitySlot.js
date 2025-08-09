module.exports = (sequelize, DataTypes) => {
    const AvailabilitySlot = sequelize.define('AvailabilitySlot', {
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
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 6 },
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
        slot_date: {
            type: DataTypes.DATE,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'availability_slots',
        timestamps: false,
    });
    
    return AvailabilitySlot;
};
