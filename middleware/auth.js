import jwt from "jsonwebtoken";

// Middleware to protect routes
export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token; // JWT stored in HttpOnly cookie
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
