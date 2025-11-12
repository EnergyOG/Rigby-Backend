import jwt from "jsonwebtoken";
import Login from "../../model/auth/login.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class LoginController {
  static userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      // check if user exists
      const existingUser = await Login.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // validate password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // generate JWT
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      //generate http-only cookie
      res.cookie('token', token, {
        httpOnly:true,
        secure:true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      })

      // success response
      res.status(200).json({
        message: "Login successful",
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default LoginController;
