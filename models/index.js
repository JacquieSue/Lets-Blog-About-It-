const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User,  {
    foreignKey: 'user_id'
});

//blog has many comments
Blog.hasMany(Comment, {
    foreignKey: 'user_id'
})

//comments belongs to user
Comment.belongsTo(User,  {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };