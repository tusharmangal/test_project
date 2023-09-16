'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    total_orders: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.user_password, +ServerConfig.SALT_ROUNDS);
    user.user_password = encryptedPassword;
  });
  return User;
};