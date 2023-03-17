import User, { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const getUserById = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findById(userId);
  return foundUser;
};

const updateUserById = async (
  productId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(productId, update, {
    new: true,
  });
  return foundUser;
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const foundUser = User.findOne({ email: email });
  return foundUser;
};

export default {
  createUser,
  getUserById,
  updateUserById,
  findUserByEmail,
};
