import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { CustomError } from "../utils/customError";

export const UserService = {
  GetUsers: async () => {
    const users = await UserRepository.FindAll();

    const usersWithoutPassword = users.map(
      ({ password, ...userData }) => userData
    );

    return usersWithoutPassword;
  },

  Me: async (userId: number) => {
    const user = await UserRepository.FindById(userId);

    if (!user) {
      throw new CustomError(403, "User not found");
    }

    const { password, ...userData } = user;

    return userData;
  },

  UpdateProfile: async (userId: number, payload: IUser) => {
    const user = await UserRepository.FindById(userId);

    if (!user) {
      throw new CustomError(403, "User not found");
    }

    const updatedUser = await UserRepository.Update(userId, payload);

    const { password, ...updatedUserFields } = updatedUser;

    return updatedUserFields;
  },

  DeleteUser: async (userId: number) => {
    const user = await UserRepository.FindById(userId);

    if (!user) {
      throw new CustomError(403, "User not found");
    }

    await UserRepository.Delete(userId);

    return;
  },
};
