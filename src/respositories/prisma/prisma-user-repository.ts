import { User } from "../../entities/user";
import { prisma } from "../../lib/prima";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user: any = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user: any = await prisma.user.findUniqueOrThrow({
      where: { email },
    });
    return { ...user };
  }
  async create(user: User): Promise<User> {
    const createUser: any = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password_hash: user.password,
      },
    });
    return createUser;
  }
}
