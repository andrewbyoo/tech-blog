const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  // Add foreign key to post primary key once created
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  // Add foreign key to user
  foreignKey: 'user_id'
})

module.exports = { User, Post };
