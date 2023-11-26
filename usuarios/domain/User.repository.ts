import User from "./User";

export default interface UserRepository {
  getAllUsers(): Promise<User[] | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  createUser(user: any): Promise<User | undefined>;
}
