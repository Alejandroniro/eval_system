import User from "../models/users.js";

const usersRepository = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id);
  },
  createUser: async (user) => {
    return await User.create(user);
  },
  updateUser: async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },
};

export default usersRepository;