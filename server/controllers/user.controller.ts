import type { NextFunction, Request, Response } from "express";

import User, { type IUser } from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/jwt.js";
import { redis } from "../utils/redis.js";
import { type ITokenOptions } from "../utils/jwt.js";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateRole,
} from "../services/user.service.js";
import { v2 as cloudinary } from "cloudinary";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface IActivationPayload {
  user: IRegistrationBody;
  activationCode: string;
}

export const registrationUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const isEmailAlreadyExist = await User.findOne({ email });

    if (isEmailAlreadyExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationToken = generateActiveToken(user);

    const data = {
      user,
      activationCode: activationToken.activationCode,
    };

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      return res.status(200).json({
        message: `Please check your email ${user.email} to activate your account`,
        success: true,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to send email", 500));
    }
  },
);

export const generateActiveToken = (
  user: IRegistrationBody,
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    },
  );

  return {
    token,
    activationCode,
  };
};

export const activateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } =
      req.body as IActivationRequest;

    const newUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as Secret,
    ) as IActivationPayload;

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { email, password, name } = newUser.user;

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist.", 400));
    }

    await User.create({
      email,
      password,
      name,
      isVerified: true,
    });

    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  },
);

interface ILoginBody {
  email: string;
  password: string;
}

export const loginUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: ILoginBody = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const verifyPassword = await user.comparePassword(password);
    console.log(verifyPassword);

    if (!verifyPassword) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    await sendToken(user, 200, res);
  },
);

export const logoutUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });

    const userId = req.user?._id.toString() || "";

    await redis.del(userId);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  },
);

export const updateAccessToken = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies?.refreshToken;
      if (!refresh_token) {
        return next(new ErrorHandler("Please login first", 401));
      }
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as Secret,
      ) as JwtPayload;

      if (!decoded.id) {
        return next(new ErrorHandler("Refresh token is not valid", 401));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(
          new ErrorHandler("Session expired. Please login again", 401),
        );
      }

      const user = JSON.parse(session) as IUser;

      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.ACCESS_TOKEN as Secret,
        {
          expiresIn: "5m",
        },
      );

      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.REFRESH_TOKEN as Secret,
        {
          expiresIn: "3d",
        },
      );
      const accessTokenExpiry = parseInt(
        process.env.ACCESS_TOKEN_EXPIRE || "300",
        10,
      );

      const refreshTokenExpiry = parseInt(
        process.env.REFRESH_TOKEN_EXPIRE || "1200",
        10,
      );

      const accessTokenOptions: ITokenOptions = {
        expires: new Date(Date.now() + accessTokenExpiry * 60 * 60 * 1000),
        maxAge: accessTokenExpiry * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      };

      const refreshTokenOptions: ITokenOptions = {
        expires: new Date(
          Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000,
        ),
        maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      };

      req.user = user;
      res.cookie("accessToken", accessToken, accessTokenOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenOptions);

      await redis.set(user._id.toString(), JSON.stringify(user), "EX", 604800);

      res.status(200).json({
        success: true,
        accessToken,
        status: "success",
      });
    } catch (error) {
      return next(new ErrorHandler("Invalid refresh token", 401));
    }
  },
);

export const getUserInfo = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id.toString() || "";
      await getUserById(userId, res);
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch user info", 500));
    }
  },
);

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: {
    public_id?: string;
    url?: string;
  };
}

export const socialAuth = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar }: ISocialAuthBody = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const newUser = await User.create({
        email,
        name,
        avatar,
      });

      return sendToken(newUser, 200, res);
    }

    return sendToken(user, 200, res);
  },
);

interface IUpdateUserInfoBody {
  name?: string;
  email?: string;
}

export const updateUserInfo = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id.toString() || "";
    const { name, email }: IUpdateUserInfoBody = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    if (email && user.email !== email) {
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      user.email = email;
    }

    if (name && user.name !== name) {
      user.name = name;
    }

    await user.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  },
);

interface IUpdateUserPasswordBody {
  newPassword: string;
  currentPassword: string;
}

export const updateUserPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id.toString() || "";
    const { newPassword, currentPassword }: IUpdateUserPasswordBody = req.body;

    if (!newPassword || !currentPassword) {
      return next(
        new ErrorHandler("Please provide both current and new password", 400),
      );
    }

    if (currentPassword === newPassword) {
      return next(
        new ErrorHandler(
          "Same password can not be use please enter a unique password",
          401,
        ),
      );
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Current password is incorrect", 401));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  },
);

interface IUpdateUserAvatarBody {
  avatar: string;
}

export const updateUserAvatar = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id.toString() || "";

      const { avatar }: IUpdateUserAvatarBody = req.body;

      if (!avatar) {
        return next(new ErrorHandler("Please provide an avatar", 400));
      }

      const user = await User.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Delete old avatar
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar
      const uploadedImage = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });

      // Save new avatar
      user.avatar = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };

      await user.save();

      await redis.set(userId, JSON.stringify(user));

      return res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        avatar: user.avatar,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Failed to update avatar", 500));
    }
  },
);

export const getAllUsers = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUsers(res);
    } catch (error) {
      return next(new ErrorHandler("Failed to get all users", 500));
    }
  },
);

// Update user role -- Only for admin
export const updateUserRole = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;

      if (!id || !role) {
        return next(new ErrorHandler("Please provide user ID and role", 400));
      }

      await updateRole(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || Array.isArray(id)) {
        return next(new ErrorHandler("Please provide user ID", 400));
      }

      await deleteUserById(res, id);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
