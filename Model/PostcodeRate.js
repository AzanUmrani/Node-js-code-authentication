module.exports = (sequelize, DataTypes) => {
  const PostcodeRate = sequelize.define('PostcodeRate', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    postcode_prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hourly_rate: {
      type: DataTypes.NUMERIC(6, 2),
      allowNull: false,
    },
    area_name: {
      type: DataTypes.STRING,
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
    tableName: 'postcode_rates',
    timestamps: false,
  });

  return PostcodeRate;
};
