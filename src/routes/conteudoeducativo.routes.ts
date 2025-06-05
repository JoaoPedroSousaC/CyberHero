import { FastifyInstance } from "fastify";
import { ConteudoEducativoUseCase } from "../usecases/conteudoeducativo.usecase";
import { ConteudoEducativoCreate } from "../interfaces/ConteudoEducativo.interface";

export async function ConteudoEducativoRoutes(fastify: FastifyInstance) {
    const ConteudoEducativoUseCase = new ConteudoEducativoUseCase();

    fastify.post<{ Body: ConteudoEducativoCreate }>("/", async (req, reply) => {
        const { name, titulo, texto} = req.body;
        try {
            const existingConteudoEducativo = await ConteudoEducativoUseCase.getByTitulo(titulo);
            if (existingConteudoEducativo) {
                return reply.status(400).send({ error: "ConteudoEducativo already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { titulo: string; texto: string } }>("/cadastrar", async (req, reply) => {
        try {
            const { titulo} = req.body;
            const ConteudoEducativo = await ConteudoEducativoUseCase.getByTitulo(titulo);
            if (!ConteudoEducativo) {
                return reply.status(401).send({ error: "Invalid titulo or texto" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const ConteudoEducativo = await ConteudoEducativoUseCase.get(req.params.id);
            if (!ConteudoEducativo) {
                return reply.status(404).send({ message: "ConteudoEducativo not found" });
            }
            return reply.send(ConteudoEducativo);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<ConteudoEducativoCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await ConteudoEducativoUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await ConteudoEducativoUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
