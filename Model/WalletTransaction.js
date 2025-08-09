module.exports = (sequelize, DataTypes) => {
  const WalletTransaction = sequelize.define('WalletTransaction', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM('top_up', 'lead_purchase', 'refund', 'withdrawal'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    stripe_payment_intent_id: {
      type: DataTypes.STRING,
    },
    stripe_session_id: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      defaultValue: 'pending',
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
    tableName: 'wallet_transactions',
    timestamps: false,
  });

  return WalletTransaction;
};
