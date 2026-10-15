import UserRepository from "../repository/user.repository.js";
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(userData) {
    const { name, email, age } = userData;

    if (!name || !email || !age) {
      throw new Error("Name, email and age are required");
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    return await this.userRepository.create({
      name,
      email,
      age,
    });
  }

  async updateUser(id, userData) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.updateById(id, userData);
  }

  async deleteUser(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.deleteById(id);

    return {
      message: "User deleted successfully",
    };
  }
}

export { UserService };
