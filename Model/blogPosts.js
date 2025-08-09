module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    featured_image_url: {
      type: DataTypes.STRING,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'success-stories',
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publish_date: {
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
    seo_title: {
      type: DataTypes.STRING,
    },
    seo_description: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.TEXT,  // Store tags as a comma-separated string
    },
  }, {
    tableName: 'blog_posts',
    timestamps: false,
  });

  // BlogPost.associate = (models) => {
  //   BlogPost.belongsTo(models.User, { foreignKey: 'author_id', targetKey: 'id' });
  // };

  return BlogPost;
};
