const assert = require('assert');
const User = require('../src/models/user');
const BlogPost = require('../src/models/blogPost');
const Comment = require('../src/models/comment');

describe('Associations: ', () => {
  let joe;
  let blogpost;
  let comment;
  beforeEach(done => {
    joe = new User({
      name: 'Joe',
    });
    blogpost = new BlogPost({
      title: 'Js is great',
      content: 'Hello world',
    });
    comment = new Comment({
      content: 'Yup',
    });
    joe.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    comment.author = joe;
    Promise.all([joe.save(), blogpost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it('Save a relationship between user and blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'Js is great');
        done();
      });
  });

  it('Save a full relationship graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'author',
            model: 'user',
          },
        },
      })
      .then(user => {
        assert(user.blogPosts[0].comments[0].author.name === 'Joe');
        done();
      });
  });
});
