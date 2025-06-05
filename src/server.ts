import fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";

import { userRoutes } from "./routes/user.routes";
import { administradorRoutes } from "./routes/administrador.routes";
import { JogoRoutes } from "./routes/jogo.routes";
import { ConteudoEducativoRoutes } from "./routes/conteudoeducativo.routes";
import { ConteudoImagemRoutes } from "./routes/conteudoimagem.routes";
import { LojaRoutes } from "./routes/loja.routes";
import { MedalhaRoutes } from "./routes/medalha.routes";
import { MedalhaDisponivelNaLojaRoutes } from "./routes/medalhadisponivelnaloja.routes";

// Carrega variáveis do .env
dotenv.config();

const app: FastifyInstance = fastify({});

// Registro de rotas
app.register(userRoutes, { prefix: '/users' });
app.register(administradorRoutes, { prefix: '/administrador' });
app.register(JogoRoutes, { prefix: '/jogo' });
app.register(ConteudoEducativoRoutes, { prefix: '/conteudoeducativo' });
app.register(ConteudoImagemRoutes, { prefix: '/conteudoimagem' });
app.register(LojaRoutes, { prefix: '/loja' });
app.register(MedalhaRoutes, { prefix: '/medalha' });
app.register(MedalhaDisponivelNaLojaRoutes, { prefix: '/medalhadisponivelnaloja' });

// Define porta do Render ou local
const port = parseInt(process.env.PORT || "3333");

// Start do servidor - necessário host: "0.0.0.0" no Render
app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
  console.log(`🚀 Server is running at ${address}`);
});
