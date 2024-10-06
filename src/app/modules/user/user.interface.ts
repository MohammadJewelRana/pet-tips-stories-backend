import { Types } from 'mongoose';

export type Address = {
  currentCity: string;
  homeTown: string;
  relationship: string;
};

export type TFollower = {
  followers: [{ userId: Types.ObjectId }];
};
export type TFollowing = {
  following: [{ userId: Types.ObjectId }];
};

export type TUser = {
  fullName: string;
  surName: string;
  dob: Date;
  gender: 'male' | 'female' | 'others';
  email: string;
  password: string;
  followers?: TFollower;
  following?: TFollowing;
  profileImage?: string;
  
  bio?: string;
  address?: Address;
  contactNumber?: string;

  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
