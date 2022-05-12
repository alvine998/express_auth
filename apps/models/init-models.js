var DataTypes = require("sequelize").DataTypes;
var _signin_log = require("./signin_log");

function initModels(sequelize) {
  var signin_log = _signin_log(sequelize, DataTypes);

  signin_log.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(signin_log, { as: "signin_logs", foreignKey: "user_id"});

  return {
    signin_log,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
