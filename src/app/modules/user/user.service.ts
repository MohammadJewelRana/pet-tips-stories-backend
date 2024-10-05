/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import { AuthUser } from '../AuthUser/AuthUser.model';
import { TAuthUser } from '../AuthUser/AuthUser.interface';

const createUserIntoDB = async (payload: TUser) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //transaction 1
    const result = await User.create([payload], { session });
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create an user!!');
    }

    // transaction 2

    const authUserData: Partial<TAuthUser> = {};
    authUserData.id = result?.[0]._id;
    authUserData.email = result?.[0].email;
    authUserData.password = result?.[0].password;
    authUserData.role = result?.[0].role;
    authUserData.status = result?.[0].status;

    const authUserCreate = await AuthUser.create([authUserData], { session });
    if (!authUserCreate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create an user!!');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'please give user id');
  }
  const result = await User.findOne({ _id: userId, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user not found');
  }
  return result;
};

const deleteSingleUserFromDB = async (userId: string) => {
  if (!userId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid user ID',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // transaction 1
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { isDeleted: true } },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
    }

    // transaction 2
    const result1 = await AuthUser.findOneAndUpdate(
      { id: userId },
      { $set: { isDeleted: true } },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!result1) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete auth user!');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message || error);
  }
};

const updateSingleUserFromDB = async (
  userId: string,
  payload: Partial<TUser>,
) => {
  if (!userId || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide user ID and data',
    );
  }

  const { address, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`address.${key}`] = value;
    }
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Transaction 1
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: modifiedUpdatedData },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user!');
    }

    // Transaction 2
    const { email, role, status, isDeleted } = result;
    const newAuthData = { email, role, status, isDeleted };

    const result1 = await AuthUser.findOneAndUpdate(
      { id: userId },
      { $set: newAuthData },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!result1) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update auth user!');
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message || error);
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
};
