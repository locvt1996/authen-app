import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

import { UserDoc } from "./type";

const userSchema = new mongoose.Schema<UserDoc>({
  email: {
    type: String,
    required: [true, "Please tell me your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide correct email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password too min"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserDoc>("User", userSchema);

export default User;
