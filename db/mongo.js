var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds133158.mlab.com:33158/final_project', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});

var db = mongoose.connection;

var keySchema = new mongoose.Schema({
  key: String
});

var reviewSchema = new mongoose.Schema({
  className: String,
  semester: String,
  rating: Number,
  text: String
});

var Key = mongoose.model('Key', keySchema);
var Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = {
  Key: Key,
  Reviews: Reviews,
  mongoose: mongoose,
  db: db
};
