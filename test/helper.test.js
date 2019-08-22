const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// eslint-disable-next-line no-undef
before(done => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('We are connected!!');
    done();
  }).on('error', err => {
    console.log('Error: ', err);
  });
});

beforeEach(done => {
  const db = mongoose.connection;
  const { users, blogposts, comments } = db.collections;
  users.drop(() => {
    blogposts.drop(() => {
      comments.drop(() => {
        done();
      });
    });
  });
});
