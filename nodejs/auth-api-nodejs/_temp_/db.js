const config = require("../config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,\
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DATABASE_URL || process.env.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  RefreshToken: require("../model/refresh-token.model"),
  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
