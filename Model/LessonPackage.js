module.exports = (sequelize, DataTypes) => {
    const LessonPackage = sequelize.define('LessonPackage', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        is_intensive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        includes_test: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        }
    }, {
        tableName: 'lesson_packages',
        timestamps: false,
    });

    return LessonPackage;
};
