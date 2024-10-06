/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

import { Post } from './post.model';
import { TPost } from './post.interface';

const createPostIntoDB = async (payload: TPost) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }

  const result = await Post.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create an post!!');
  }

  return result;
};

const getAllPostFromDB = async () => {
  const result = await Post.find({ isDeleted: false }).populate('userId');

  return result;
};

const getSinglePostFromDB = async (postId: string) => {
  if (!postId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'please give post id');
  }
  const result = await Post.findOne({ _id: postId, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'post not found');
  }
  return result;
};

const deleteSinglePostFromDB = async (postId: string) => {
  if (!postId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid user ID',
    );
  }

  const result = await Post.findByIdAndUpdate(
    postId,
    { $set: { isDeleted: true } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete post!');
  }

  return result;
};

const updateSinglePostFromDB = async (
  postId: string,
  payload: Partial<TPost>,
) => {
  if (!postId || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide post ID and data',
    );
  }

  const { ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  //   if (address && Object.keys(address).length) {
  //     for (const [key, value] of Object.entries(address)) {
  //       modifiedUpdatedData[`address.${key}`] = value;
  //     }
  //   }

  const result = await Post.findByIdAndUpdate(
    postId,
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user!');
  }

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  deleteSinglePostFromDB,
  updateSinglePostFromDB,
};
