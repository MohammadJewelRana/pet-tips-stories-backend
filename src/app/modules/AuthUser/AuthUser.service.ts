import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './AuthUser.interface';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';
import { createToken } from './AuthUser.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const loginUserFromDB = async (payload: TLoginUser) => {
  //   console.log(payload);

  const isUserExists = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  //   console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (isUserExists?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //check password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  // console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, '    password does not match  ');
  }

  //create token and sent to client
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // console.log(token);

  //verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  // console.log(decoded);

  //get data from token decoded
  const { userId, iat } = decoded;

  //validations
  const isUserExists = await User.findOne({ _id: userId }).select('+password');
  // console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  if (isUserExists?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //old token expire if password change then create new token
  // const isJWTIssuedBeforePasswordChanged = (
  //   passwordChangedTimeStamp: Date,
  //   jwtIssuedTimestamp: number,
  // ) => {
  //   //convert in mili second like jwt issued timestamp
  //   const passwordChangedTime =
  //     new Date(passwordChangedTimeStamp).getTime() / 1000;
  //   return passwordChangedTime > jwtIssuedTimestamp;
  // };

  // if (
  //   isUserExists.passwordChangedAt &&
  //   isJWTIssuedBeforePasswordChanged(
  //     isUserExists.passwordChangedAt,
  //     iat as number,
  //   )
  // ) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'you are not authorized!!');
  // }

  //create token and sent to client
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserFromDB,
  refreshToken,
};
