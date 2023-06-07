import { User } from "../../src/entities/user";
import { UserRepository } from "../../src/respositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id.toValue() === id);
    if (!user) return null;

    return user;
  }
}
