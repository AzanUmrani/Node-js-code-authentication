module.exports = (sequelize, DataTypes) => {
  const SupportTicket = sequelize.define('SupportTicket', {
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
    support_type: {
      type: DataTypes.ENUM('student_question', 'subscription_question', 'app_support'),
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profiles',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      defaultValue: 'open',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
    resolved_at: {
      type: DataTypes.DATE,
    },
    admin_response: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'support_tickets',
    timestamps: false,
  });

  // SupportTicket.associate = (models) => {
  //   SupportTicket.belongsTo(models.Profile, { foreignKey: 'instructor_id', targetKey: 'id' });
  //   SupportTicket.belongsTo(models.Profile, { foreignKey: 'student_id', targetKey: 'id' });
  // };

  return SupportTicket;
};
