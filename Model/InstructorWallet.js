module.exports = (sequelize, DataTypes) => {
    const InstructorWallet = sequelize.define('InstructorWallet', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            unique: true
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        total_spent: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        total_earned: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: 'instructor_wallets',
        timestamps: false,
    });

    return InstructorWallet;
};
