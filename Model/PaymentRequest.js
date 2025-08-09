module.exports = (sequelize, DataTypes) => {
  const PaymentRequest = sequelize.define('PaymentRequest', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profiles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    lead_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'leads',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profiles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
    },
    request_type: {
      type: DataTypes.ENUM('first_lesson', 'midway_payment'),
      defaultValue: 'first_lesson',
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'paid', 'rejected'),
      defaultValue: 'pending',
    },
    first_lesson_date: {
      type: DataTypes.DATE,
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
    tableName: 'payment_requests',
    timestamps: false,
  });

  // PaymentRequest.associate = (models) => {
  //   PaymentRequest.belongsTo(models.Profile, { foreignKey: 'instructor_id', targetKey: 'id' });
  //   PaymentRequest.belongsTo(models.Lead, { foreignKey: 'lead_id', targetKey: 'id' });
  //   PaymentRequest.belongsTo(models.Profile, { foreignKey: 'student_id', targetKey: 'id' });
  // };

  return PaymentRequest;
};
