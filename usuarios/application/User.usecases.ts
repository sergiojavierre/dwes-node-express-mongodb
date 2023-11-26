import User from "../domain/User";
import UserRepository from "../domain/User.repository";

export class UserUseCases {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }
}
