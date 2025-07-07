import bcrypt from "bcrypt";
import { RegisterUserRequest, UserResponse } from "../types/authType";
import { ResponseError } from "../error/responseError";
import { User } from "../models/userModel";

export class AuthService {
  static async register(req: RegisterUserRequest): Promise<UserResponse> {
    const { username, email, password } = req;

    if (!username || !email || !password) {
      throw new ResponseError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ResponseError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser.id.toString(),
      username: newUser.username,
      email: newUser.email,
    };
  }
}
