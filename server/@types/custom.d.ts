import { type Request } from "express";

import { IUser } from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
