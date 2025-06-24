import { FastifyInstance } from "fastify";
import { AdministradorUseCase } from "../usecases/administrador.usecase";
import { AdministradorCreate } from "../interfaces/administrador.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function administradorRoutes(fastify: FastifyInstance) {
    const administradorUseCase = new AdministradorUseCase();

    fastify.post<{ Body: AdministradorCreate }>("/", async (req, reply) => {
        const { name, email, password} = req.body;
        try {
            const existingAdministrador = await administradorUseCase.getByEmail(email);
            if (existingAdministrador) {
                return reply.status(400).send({ error: "Administrador already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await administradorUseCase.create({
                name,
                email,
                password: hashedPassword,
            });
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { email: string; password: string } }>("/login", async (req, reply) => {
        try {
            const { email, password } = req.body;
            const administrador = await administradorUseCase.getByEmail(email);
            if (!administrador) {
                return reply.status(401).send({ error: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(password, administrador.password);
            if (!passwordMatch) {
                return reply.status(401).send({ error: "Invalid email or password" });
            }

            const token = jwt.sign(
                { administradorId: administrador.id, email: administrador.email },
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
            const administrador = await administradorUseCase.get(req.params.id);
            if (!administrador) {
                return reply.status(404).send({ message: "Administrador not found" });
            }
            return reply.send(administrador);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<AdministradorCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await administradorUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await administradorUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
