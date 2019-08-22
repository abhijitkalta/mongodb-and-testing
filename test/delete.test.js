const assert = require('assert');
const User = require('../src/models/user');

describe('Deleting Users', () => {
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

  it('Model instance remove', done => {
    joe
      .remove()
      .then(() => {
        User.find({ name: 'Joe' });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it('Class method remove', done => {
    User.deleteMany({ name: 'Joe' })
      .then(() => {
        User.find({ name: 'Joe' });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it('Remove a single document', done => {
    User.findOneAndDelete({ name: 'Joe' })
      .then(() => {
        User.find({ name: 'Joe' });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it('Remove document with a particular id', done => {
    User.findByIdAndDelete({ _id: joe._id })
      .then(() => {
        User.find({ name: 'Joe' });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });
});
