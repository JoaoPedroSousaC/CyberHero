import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { administradorRoutes } from "./routes/administrador.routes";
import { JogoRoutes } from "./routes/jogo.routes";
import { ConteudoEducativoRoutes } from "./routes/conteudoeducativo.routes";
import { ConteudoImagemRoutes } from "./routes/conteudoimagem.routes";
import { LojaRoutes } from "./routes/loja.routes";
import { MedalhaRoutes } from "./routes/medalha.routes";
import { MedalhaDisponivelNaLojaRoutes } from "./routes/medalhadisponivelnaloja.routes";
import cors from '@fastify/cors'
const app: FastifyInstance = fastify({})

app.register(userRoutes, {
    prefix: '/users',
    
})

app.register(administradorRoutes, {
    prefix: '/administrador',
    
})

app.register( JogoRoutes, {
    prefix: '/jogo',
    
})

app.register(ConteudoEducativoRoutes, {
    prefix: '/conteudoeducativo',
    
})

app.register(ConteudoImagemRoutes, {
    prefix: '/conteudoimagem',
    
})

app.register(LojaRoutes, {
    prefix: '/loja',
    
})

app.register(MedalhaRoutes, {
    prefix: '/medalha',
    
})

app.register(MedalhaDisponivelNaLojaRoutes, {
    prefix: '/medalhadisponivelnaloja',
    
})

const PORT = process.env.PORT || 3000;

app.register(cors, {
    origin: '*'
});

app.listen({
  port: Number(process.env.PORT) || 3000,
  host: '0.0.0.0'
}, () => {
    console.log(`Server is running on port ${PORT}`);
});
