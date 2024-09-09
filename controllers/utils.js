import { database } from "../Model/index.js";
import bcrypt from 'bcrypt';

export const checkIfUserExists = async (email) => {
    const user = await database.user.findOne({ where: { email: email } });
    if (user) {
      return user;
    }
    return false;
  };


export const createPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}