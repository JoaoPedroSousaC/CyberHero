import { FastifyInstance } from "fastify";
import { ConteudoImagemUseCase } from "../usecases/conteudoimagem.usecase";
import { ConteudoImagemCreate } from "../interfaces/conteudoimagem.interface";

export async function ConteudoImagemRoutes(fastify: FastifyInstance) {
    const { ConteudoImagemUseCase } = require('../usecases/conteudoimagem.usecase');
    const conteudoimagem = new ConteudoImagemUseCase();

    fastify.post<{ Body: ConteudoImagemCreate }>("/", async (req, reply) => {
        const { url} = req.body;
        try {
            const existingConteudoImagem = await ConteudoImagemUseCase.getByUrl(url);
            if (existingConteudoImagem) {
                return reply.status(400).send({ error: "ConteudoImagem already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { titulo: string; texto: string } }>("/cadastrar", async (req, reply) => {
        try {
            const { titulo} = req.body;
            const ConteudoImagem = await ConteudoImagemUseCase.getByTitulo(titulo);
            if (!ConteudoImagem) {
                return reply.status(401).send({ error: "Invalid titulo or texto" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const ConteudoImagem = await ConteudoImagemUseCase.get(req.params.id);
            if (!ConteudoImagem) {
                return reply.status(404).send({ message: "ConteudoImagem not found" });
            }
            return reply.send(ConteudoImagem);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<ConteudoImagemCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await ConteudoImagemUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await ConteudoImagemUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
