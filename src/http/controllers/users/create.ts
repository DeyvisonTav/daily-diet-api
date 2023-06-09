import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "../../../respositories/prisma/prisma-user-repository";
import { CreateUseCase } from "../../../use-case/create-user";
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const usersRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUseCase(usersRepository);

    await createUserUseCase.execute({ name, email, password });
  } catch (err) {
    throw err;
  }
  return reply.status(201).send();
}
