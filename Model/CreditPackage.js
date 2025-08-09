module.exports = (sequelize, DataTypes) => {
    const CreditPackage = sequelize.define('CreditPackage', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        is_most_popular: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        tableName: 'credit_packages',
        timestamps: false,
    });

    return CreditPackage;
};
