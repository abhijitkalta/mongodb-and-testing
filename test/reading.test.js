const assert = require('assert');
const User = require('../src/models/user');

describe('Reading Users: ', () => {
  let joe;
  beforeEach(done => {
    joe = new User({
      name: 'Joe',
      posts: [
        {
          title: 'Hello world!!',
        },
      ],
    });

    joe.save().then(() => {
      done();
    });
  });
  it('Find all users with the name of joe', done => {
    User.find({
      name: 'Joe',
    }).then(users => {
      assert(users[0].id.toString() === joe._id.toString());
      done();
    });
  });
  it('Find a user with particular id', done => {
    User.findOne({
      _id: joe._id,
    }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
