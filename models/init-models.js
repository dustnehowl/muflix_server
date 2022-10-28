var DataTypes = require("sequelize").DataTypes;
var _MUSIC = require("./MUSIC");
var _USER = require("./USER");

function initModels(sequelize) {
  var MUSIC = _MUSIC(sequelize, DataTypes);
  var USER = _USER(sequelize, DataTypes);


  return {
    MUSIC,
    USER,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
