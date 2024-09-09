import { checkIfUserExists ,createPassword} from "./utils.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from 'bcrypt';

configDotenv();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await checkIfUserExists(email);
  if (!user) {
    res.send({ message: "user does not exist" });
    return;
  }
  const newpassword = await createPassword(password);
  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password
  );
  if (!passwordMatch) {
    res.send({ message: "Authentication failed!!" });
  }

//   const token = jwt.sign(password, process.env.SECRET_KEY, {
//     expiresIn: "1h",
//   });

  let token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
  res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
  res.status(200).json({ token: token });
};
