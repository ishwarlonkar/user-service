import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      resizeBy.status(402).send({ message: "Access Denied" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.send(401).json({ error: "invalid token" });
  }
};
