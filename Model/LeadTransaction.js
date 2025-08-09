module.exports = (sequelize, DataTypes) => {
    const LeadTransaction = sequelize.define('LeadTransaction', {
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
            }
        },
        lead_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'leads',
                key: 'id'
            }
        },
        transaction_type: {
            type: DataTypes.ENUM('lead_purchase', 'wallet_topup', 'refund'),
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stripe_payment_intent_id: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
            defaultValue: 'pending'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        }
    }, {
        tableName: 'lead_transactions',
        timestamps: false,
    });

    return LeadTransaction;
};
