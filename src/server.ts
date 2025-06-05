import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors';

import { userRoutes } from "./routes/user.routes";
import { administradorRoutes } from "./routes/administrador.routes";
import { JogoRoutes } from "./routes/jogo.routes";
import { ConteudoEducativoRoutes } from "./routes/conteudoeducativo.routes";
import { ConteudoImagemRoutes } from "./routes/conteudoimagem.routes";
import { LojaRoutes } from "./routes/loja.routes";
import { MedalhaRoutes } from "./routes/medalha.routes";
import { MedalhaDisponivelNaLojaRoutes } from "./routes/medalhadisponivelnaloja.routes";

const app: FastifyInstance = fastify({});

// Habilita CORS
await app.register(cors, {
  origin: true, // ou especifique: ['http://localhost:3000', 'https://seu-front.vercel.app']
});

app.register(userRoutes, { prefix: '/users' });
app.register(administradorRoutes, { prefix: '/administrador' });
app.register(JogoRoutes, { prefix: '/jogo' });
app.register(ConteudoEducativoRoutes, { prefix: '/conteudoeducativo' });
app.register(ConteudoImagemRoutes, { prefix: '/conteudoimagem' });
app.register(LojaRoutes, { prefix: '/loja' });
app.register(MedalhaRoutes, { prefix: '/medalha' });
app.register(MedalhaDisponivelNaLojaRoutes, { prefix: '/medalhadisponivelnaloja' });

const PORT = process.env.PORT || 3000;

app.listen({
  port: Number(PORT),
  host: '0.0.0.0',
}).then(() => {
  console.log(`🚀 Server is running on port ${PORT}`);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
