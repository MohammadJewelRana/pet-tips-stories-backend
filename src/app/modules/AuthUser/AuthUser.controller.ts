import httpStatus from 'http-status';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './AuthUser.service';
 

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none', //frontend and backend different domain
    maxAge: 1000 * 60 * 60 * 24 * 365, //cookie token set for 1 year
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken, refreshToken },
  });
});



 
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // console.log(refreshToken);

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token retrieved successfully',
    data: result,
  });
});


export const AuthControllers = {
  loginUser,
  refreshToken
};
