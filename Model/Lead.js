module.exports = (sequelize, DataTypes) => {
    const Lead = sequelize.define('Lead', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        learner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        package_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'lesson_packages',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transmission_type: {
            type: DataTypes.ENUM('manual', 'automatic'),
            allowNull: false
        },
        availability: {
            type: DataTypes.STRING,
        },
        experience_level: {
            type: DataTypes.ENUM('complete_beginner', 'some_experience', 'failed_test_before'),
        },
        status: {
            type: DataTypes.ENUM('active', 'matched', 'completed', 'cancelled'),
            defaultValue: 'active'
        },
        assigned_instructor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 15.00
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        matched_at: {
            type: DataTypes.DATE
        },
        notes: {
            type: DataTypes.TEXT,
        }
    }, {
        tableName: 'leads',
        timestamps: false,
    });

    return Lead;
};
