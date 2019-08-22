const assert = require('assert');
const User = require('../src/models/user');
const BlogPost = require('../src/models/blogPost');

describe('Middleware: ', () => {
  let joe;
  let blogpost;

  beforeEach(done => {
    joe = new User({
      name: 'Joe',
    });
    blogpost = new BlogPost({
      title: 'Js is great',
      content: 'Hello world',
    });

    joe.blogPosts.push(blogpost);

    Promise.all([joe.save(), blogpost.save()]).then(() => {
      done();
    });
  });

  it('Remove dangling blogpost when user is deleted', done => {
    joe
      .remove()
      .then(() => BlogPost.find({}).countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
