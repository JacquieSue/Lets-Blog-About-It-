const User = require('./User');
const Blog = require('./Blog');

User.hasMany(BBlog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User,  {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };