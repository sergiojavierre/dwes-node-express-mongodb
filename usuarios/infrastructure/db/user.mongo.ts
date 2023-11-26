import { collections } from "../../../context/MongoConnection";
import User from "../../domain/User";
import UserRepository from "../../domain/User.repository";
import { ObjectId } from "mongodb";

export default class UserRepositoryMongoDB implements UserRepository {
  async getAllUsers(): Promise<User[] | undefined> {
    const usersFromDB = await collections.users.find().toArray();
    if (!usersFromDB) return undefined;
    const users: User[] = usersFromDB.map((userFromDB) => {
      const user: User = {
        id: String(userFromDB._id),
        name: userFromDB.name,
        email: userFromDB.email,
        password: userFromDB.password,
      };
      return user;
    });
    return users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const objectId = new ObjectId(id);
    const userFromDB = await collections.users.findOne({ _id: objectId });
    if (!userFromDB) return undefined;
    const user: User = {
      id: String(userFromDB._id),
      name: userFromDB.name,
      email: userFromDB.email,
      password: userFromDB.password,
    };
    return user;
  }

  async createUser(user: User): Promise<User | undefined> {
    const result = await collections.users.insertOne(user);
    const id = String(result.insertedId);
    return await this.getUserById(id);
  }
}
