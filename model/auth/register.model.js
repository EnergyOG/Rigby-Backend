import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

const Register = models.Signup || model("Signup", registerSchema);

export default Register;
