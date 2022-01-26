const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  // Add foreign key to post primary key once created
});

Post.belongsTo(User, {
  // Add foreign key to user
})

module.exports = { User };
