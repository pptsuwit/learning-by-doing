const mongoose = require("mongoose");
const connectionOptions = {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DATABASE_URL || process.env.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/user.model"),
  RefreshToken: require("../models/refresh-token.model"),
  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
