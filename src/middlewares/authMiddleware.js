import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};


export const authorize = (req,res,next) => {
  
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message:'not authorized'
    })
  }
  next();
}