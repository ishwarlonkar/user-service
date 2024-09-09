import { DataTypes } from "sequelize";

export const userModel = (sequelize) => {
  const user = sequelize.define("userdirectory", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
  return user;
};
