import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Register = models.Register || model("Register", registerSchema);

export default Register;
