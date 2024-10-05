import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }
  const result = await User.create(payload);
  return result;
};

const getAllUser=async ()=>{
    const result = await User.find();
    return result;

}

export const UserServices = {
  createUserIntoDB,
  getAllUser
};
