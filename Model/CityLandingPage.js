module.exports = (sequelize, DataTypes) => {
  const CityLandingPage = sequelize.define('CityLandingPage', {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    county: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: 'UK',
    },
    hero_title: {
      type: DataTypes.STRING,
    },
    hero_description: {
      type: DataTypes.TEXT,
    },
    meta_title: {
      type: DataTypes.STRING,
    },
    meta_description: {
      type: DataTypes.STRING,
    },
    featured_image_url: {
      type: DataTypes.STRING,
    },
    instructor_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    average_rating: {
      type: DataTypes.NUMERIC(3, 2),
      defaultValue: 0,
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
    tableName: 'city_landing_pages',
    timestamps: false,
  });

  return CityLandingPage;
};
