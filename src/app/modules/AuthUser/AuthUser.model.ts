/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAuthUser } from './AuthUser.interface';
import { UserStatus } from './AustUser.constant';

const authUserSchema = new Schema<TAuthUser>(
  {
    id: { type: Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: { type: Date },
    role: { type: String, enum: ['user', 'admin'] },
    status: { type: String, enum: UserStatus },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const AuthUser = model<TAuthUser>('AuthUser', authUserSchema);
