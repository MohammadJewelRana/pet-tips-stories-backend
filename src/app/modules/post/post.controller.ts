import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post is created successfully',
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Post retrieved successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Post retrieved successfully',
    data: result,
  });
});

const deleteSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deleteSinglePostFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Post deleted successfully',
    data: result,
  });
});

const updateSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await PostServices.updateSinglePostFromDB(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Post updated successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPost,
  getSinglePost,
  deleteSinglePost,
  updateSinglePost,
};
