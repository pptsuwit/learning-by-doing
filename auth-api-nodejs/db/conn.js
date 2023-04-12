const { MongoClient } = require("mongodb");
const Db = process.env.DATABASE_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var _db;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (error, db) {
      if (db) {
        _db = db.db(process.env.DATABASE_NAME);

        console.log("Successfully connected to DB.");
      }
      return callback(error);
    });
  },
  getDB: function () {
    return _db;
  },
};
