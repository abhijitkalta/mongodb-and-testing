const mongoose = require('mongoose');
const PostSchema = require('./post');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator(v) {
        return v.length > 2;
      },
      message: 'Name should be greater than 2',
    },
  },
  posts: [PostSchema],
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogpost',
    },
  ],
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});
UserSchema.set('toObject', { virtuals: true, getters: true });
UserSchema.set('toJSON', { virtuals: true, getters: true });

UserSchema.pre('remove', function(next) {
  // always set your hooks and virtuals before model generation
  // no arrow function in order to access this . this represents the model instance. this === joe joe
  const BlogPost = mongoose.model('blogpost'); // to remove cyclic dependency
  BlogPost.remove({
    _id: {
      $in: this.blogPosts, // to access array elements
    },
  }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
