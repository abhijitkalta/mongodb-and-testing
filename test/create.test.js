const assert = require('assert');
const User = require('../src/models/user');

describe('Creating records: ', () => {
  it('Saves a user', done => {
    const alex = new User({
      name: 'Joe',
      posts: [
        {
          title: 'Hello world!!',
        },
      ],
    });

    alex.save().then(() => {
      assert(!alex.isNew);
      done();
    });
  });
});
