import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/users.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase();

    fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
        const { name, email, password, totalpoints, paypoints, doneQuiz } = req.body;
        try {
            const existingUser = await userUseCase.getByEmail(email);
            if (existingUser) {
                return reply.status(400).send({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await userUseCase.create({
                name,
                email,
                password: hashedPassword,
                totalpoints,
                paypoints,
                doneQuiz,
            });
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { email: string; password: string } }>("/login", async (req, reply) => {
        try {
            const { email, password } = req.body;
            const user = await userUseCase.getByEmail(email);
            if (!user) {
                return reply.status(401).send({ error: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return reply.status(401).send({ error: "Invalid email or password" });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || "supersecretkey",
                { expiresIn: "1h" }
            );

            return reply.send({ token });
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const user = await userUseCase.get(req.params.id);
            if (!user) {
                return reply.status(404).send({ message: "User not found" });
            }
            return reply.send(user);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<UserCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await userUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await userUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
