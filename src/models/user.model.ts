import mongoose from "mongoose";
import User from "../interfaces/user.interfaces";

const schema = new mongoose.Schema<User>(
  {
    first_name: {
      type: String,
      min: 3,
      max: 16,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      min: 3,
      max: 20,
      trim: true,
      required: true,
    },
    date_birth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      min: 6,
      max: 16,
      trim: true,
      required: true,
    },
    mobile_phone: {
      type: String,
      min: 6,
      max: 16,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    session_active: {
      type: Boolean,      
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model('User', schema);

export default UserModel;