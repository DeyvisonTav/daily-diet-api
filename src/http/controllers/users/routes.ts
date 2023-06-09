import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function usersRouter(app: FastifyInstance) {
  app.post("/create", create);
}
