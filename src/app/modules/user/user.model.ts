import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import config from '../../config';

const addressSchema = new Schema({
  currentCity: { type: String, required: true },
  homeTown: { type: String, required: true },
  relationship: { type: String, required: true },
});
const followerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const followingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    surName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    followers: {
      type: [followerSchema],
      default: [],
    },
    following: {
      type: [followingSchema],
      default: [],
    },
    profileImage: { type: String },
    bio: { type: String },
    address: { type: addressSchema },
    contactNumber: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

export const User = model('User', userSchema);
