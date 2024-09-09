import { database } from "../Model/index.js";
import bcrypt from "bcrypt";
import { checkIfUserExists, createPassword } from "./utils.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (await checkIfUserExists(email)) {
      res.status(200).send({ message: "user already exists" });
      return;
    }

    const hashedPassword = await createPassword(password);
    const user = {
      userName: userName,
      email: email,
      password: hashedPassword,
    };

    database?.user?.create(user);
    res.status(200).send({ message: "sign up success" });
  } catch (err) {
    res.send({ message: "user signup failed" });
  }
};


