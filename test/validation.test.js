const assert = require('assert');
const User = require('../src/models/user');

describe('Validating Records: ', () => {
  it('Requires a user name', done => {
    const joe = new User({
      name: undefined,
      posts: [
        {
          title: 'Hello world!!',
        },
      ],
    });

    joe.save().then(
      user => {
        assert(false);
      },
      err => {
        assert(err.errors.name.message === 'Name is required');
        done();
      }
    );
  });

  it('Name must be greater than 2 characters', done => {
    const joe = new User({
      name: 'a',
      posts: [
        {
          title: 'Hello world!!',
        },
      ],
    });

    joe.save().then(
      user => {
        assert(false);
      },
      err => {
        assert(err.errors.name.message === 'Name should be greater than 2');
        done();
      }
    );
  });
});
