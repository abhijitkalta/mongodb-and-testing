const assert = require('assert');
const User = require('../src/models/user');

describe('Updating Records: ', () => {
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

  it('Instance type set and save', done => {
    joe.set({
      name: 'Alex',
    });
    joe.save().then(user => {
      assert(user.name === 'Alex');
      done();
    });
  });

  it('Updating all documents', done => {
    User.updateMany(
      {
        name: 'Joe',
      },
      {
        $set: {
          name: 'Alex',
        },
      }
    )
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].name === 'Alex');
        done();
      });
  });

  it('Updating a single documents', done => {
    User.updateOne(
      {
        name: 'Joe',
      },
      {
        $set: {
          name: 'Alex',
        },
      }
    )
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].name === 'Alex');
        done();
      });
  });

  it('Update a users postcount by 1', done => {
    joe.posts.push({
      title: 'Hello world 2',
    });
    joe
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].posts.length === 2);
        done();
      });
  });

  it('Removing a existing subdocument', done => {
    const { _id } = joe.posts[0];
    joe.posts.pull(_id);
    joe
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users[0].posts.length === 0);
        done();
      });
  });
});
