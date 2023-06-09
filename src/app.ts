import fastify from "fastify";
import { usersRouter } from "./http/controllers/users/routes";
export const app = fastify();

app.register(usersRouter);
