'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LegalTestResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LegalTestResults.init({
    resultType: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    callCnt: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          }
  }, {
    sequelize,
    modelName: 'LegalTestResults',
  });
  return LegalTestResults;
};