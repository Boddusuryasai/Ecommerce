import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const id = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
  }
};