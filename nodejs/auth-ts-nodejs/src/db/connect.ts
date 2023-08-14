import mongoose from "mongoose";
import { isValidId } from "../utils/utils"; // Import your utils if needed
import { UserModel as User } from "../models/user.model";
import { RefreshTokenModel as RefreshToken } from "../models/refresh-token.model";

const databseUrl = process.env.DATABASE_URL || "";
mongoose.connect(databseUrl);
mongoose.Promise = global.Promise;
export { User, RefreshToken, isValidId };
