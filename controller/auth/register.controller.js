import jwt from "jsonwebtoken";
import Register from "../../model/auth/register.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class RegisterController {
  static userRegister = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
      // Check if user already exists
      const existingUser = await Register.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Check password match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save new user (NO confirmPassword saved)
      const newUser = new Register({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Response
      return res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });

    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "Error registering user",
        error: error.message,
      });
    }
  };
}

export default RegisterController;
