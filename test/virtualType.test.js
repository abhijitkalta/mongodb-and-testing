const assert = require('assert');
const User = require('../src/models/user');

describe('Virtual types test:', () => {
  it('Post count returns number of posts', done => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {
          title: 'Hello world!!',
        },
        {
          title: 'Hello',
        },
      ],
    });
    joe
      .save()
      .then(() => User.findOne({}))
      .then(user => {
        assert(user.postCount === 2);
        done();
      });
  });
});
