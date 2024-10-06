import { Types } from "mongoose";

export type TAuthUser = {
    id: Types.ObjectId;
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role: 'admin' | 'user';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
  };
  
  export type TLoginUser = {
    email: string;
    password: string;
  };
  